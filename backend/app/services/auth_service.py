"""Cognito authentication service.

Wraps boto3 cognito-idp calls and maps Cognito exceptions to FastAPI
HTTPExceptions with user-friendly messages. Also upserts the user
profile in DynamoDB on every successful login (and refreshes lastLogin).
"""
from datetime import datetime, timezone
from typing import Dict

from botocore.exceptions import ClientError
from fastapi import HTTPException, status
from jose import jwt as jose_jwt

from app.core.cognito import cognito_client
from app.core.config import settings
from app.database.dynamodb import users_table
from app.schemas.auth import (
    ConfirmForgotPasswordRequest,
    ConfirmSignUpRequest,
    ForgotPasswordRequest,
    LoginRequest,
    ResendConfirmationRequest,
    SignUpRequest,
    TokensResponse,
)


# ─────────────────────────────────────────────────────────────
# Error mapping
# ─────────────────────────────────────────────────────────────

_COGNITO_ERROR_MAP: Dict[str, tuple] = {
    "UsernameExistsException": (status.HTTP_400_BAD_REQUEST, "An account with this email already exists."),
    "UserNotFoundException": (status.HTTP_404_NOT_FOUND, "No account found with this email."),
    "UserNotConfirmedException": (status.HTTP_403_FORBIDDEN, "Email not verified. Please verify your email first."),
    "NotAuthorizedException": (status.HTTP_401_UNAUTHORIZED, "Invalid email or password."),
    "CodeMismatchException": (status.HTTP_400_BAD_REQUEST, "Incorrect verification code."),
    "ExpiredCodeException": (status.HTTP_400_BAD_REQUEST, "Verification code has expired. Please request a new one."),
    "InvalidPasswordException": (status.HTTP_400_BAD_REQUEST, "Password does not meet the security requirements."),
    "InvalidParameterException": (status.HTTP_400_BAD_REQUEST, "Invalid request parameters."),
    "LimitExceededException": (status.HTTP_429_TOO_MANY_REQUESTS, "Too many attempts. Please try again later."),
    "TooManyRequestsException": (status.HTTP_429_TOO_MANY_REQUESTS, "Too many requests. Please slow down."),
    "TooManyFailedAttemptsException": (status.HTTP_429_TOO_MANY_REQUESTS, "Too many failed attempts. Please try again later."),
    "CodeDeliveryFailureException": (status.HTTP_500_INTERNAL_SERVER_ERROR, "Failed to deliver verification code."),
    "AliasExistsException": (status.HTTP_400_BAD_REQUEST, "An account with this email already exists."),
    "PasswordResetRequiredException": (status.HTTP_403_FORBIDDEN, "Password reset required. Please reset your password."),
}


def _raise_cognito_error(e: ClientError) -> None:
    code = e.response.get("Error", {}).get("Code", "UnknownException")
    raw_message = e.response.get("Error", {}).get("Message", "Authentication service error.")
    http_status, friendly_message = _COGNITO_ERROR_MAP.get(
        code, (status.HTTP_500_INTERNAL_SERVER_ERROR, raw_message)
    )

    # NotAuthorizedException can mean "user is disabled" — surface that distinctly.
    if code == "NotAuthorizedException" and "disabled" in raw_message.lower():
        http_status = status.HTTP_403_FORBIDDEN
        friendly_message = "This account has been disabled. Contact support."

    raise HTTPException(status_code=http_status, detail=friendly_message)


# ─────────────────────────────────────────────────────────────
# Cognito operations
# ─────────────────────────────────────────────────────────────

def sign_up(data: SignUpRequest) -> dict:
    try:
        response = cognito_client.sign_up(
            ClientId=settings.cognito_app_client_id,
            Username=data.email,
            Password=data.password,
            UserAttributes=[
                {"Name": "email", "Value": data.email},
                {"Name": "name", "Value": data.name},
            ],
        )
        return {
            "user_sub": response.get("UserSub"),
            "user_confirmed": response.get("UserConfirmed", False),
            "delivery": response.get("CodeDeliveryDetails", {}),
        }
    except ClientError as e:
        _raise_cognito_error(e)


def confirm_sign_up(data: ConfirmSignUpRequest) -> None:
    try:
        cognito_client.confirm_sign_up(
            ClientId=settings.cognito_app_client_id,
            Username=data.email,
            ConfirmationCode=data.code,
        )
    except ClientError as e:
        _raise_cognito_error(e)


def resend_confirmation_code(data: ResendConfirmationRequest) -> dict:
    try:
        response = cognito_client.resend_confirmation_code(
            ClientId=settings.cognito_app_client_id,
            Username=data.email,
        )
        return {"delivery": response.get("CodeDeliveryDetails", {})}
    except ClientError as e:
        _raise_cognito_error(e)


def login(data: LoginRequest) -> TokensResponse:
    try:
        response = cognito_client.initiate_auth(
            ClientId=settings.cognito_app_client_id,
            AuthFlow="USER_PASSWORD_AUTH",
            AuthParameters={
                "USERNAME": data.email,
                "PASSWORD": data.password,
            },
        )
    except ClientError as e:
        _raise_cognito_error(e)

    auth_result = response.get("AuthenticationResult") or {}
    if not auth_result.get("AccessToken"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Additional authentication challenge required.",
        )

    id_token = auth_result.get("IdToken", "")
    access_token = auth_result["AccessToken"]
    refresh_token = auth_result.get("RefreshToken")
    expires_in = auth_result.get("ExpiresIn", 3600)
    token_type = auth_result.get("TokenType", "Bearer")

    # Decode ID token (unverified — Cognito just minted it) to get user attributes.
    claims = jose_jwt.get_unverified_claims(id_token) if id_token else {}
    user_id = claims.get("sub")
    email_claim = claims.get("email") or data.email
    name_claim = claims.get("name") or claims.get("cognito:username") or ""

    if user_id:
        _upsert_user_profile(user_id=user_id, email=email_claim, name=name_claim)

    return TokensResponse(
        access_token=access_token,
        id_token=id_token,
        refresh_token=refresh_token,
        token_type=token_type,
        expires_in=expires_in,
    )


def forgot_password(data: ForgotPasswordRequest) -> dict:
    try:
        response = cognito_client.forgot_password(
            ClientId=settings.cognito_app_client_id,
            Username=data.email,
        )
        return {"delivery": response.get("CodeDeliveryDetails", {})}
    except ClientError as e:
        # Don't leak whether the email exists — but still surface rate-limit / generic errors.
        code = e.response.get("Error", {}).get("Code", "")
        if code in ("UserNotFoundException",):
            # Behave like success to avoid email enumeration.
            return {"delivery": {}}
        _raise_cognito_error(e)


def confirm_forgot_password(data: ConfirmForgotPasswordRequest) -> None:
    try:
        cognito_client.confirm_forgot_password(
            ClientId=settings.cognito_app_client_id,
            Username=data.email,
            ConfirmationCode=data.code,
            Password=data.new_password,
        )
    except ClientError as e:
        _raise_cognito_error(e)


def global_sign_out(access_token: str) -> None:
    try:
        cognito_client.global_sign_out(AccessToken=access_token)
    except ClientError:
        # Best-effort; we still want logout to succeed client-side.
        return


# ─────────────────────────────────────────────────────────────
# DynamoDB profile upsert
# ─────────────────────────────────────────────────────────────

def _upsert_user_profile(user_id: str, email: str, name: str) -> None:
    now_iso = datetime.now(timezone.utc).isoformat()
    try:
        users_table.update_item(
            Key={"userId": user_id},
            UpdateExpression=(
                "SET email = :e, "
                "#nm = if_not_exists(#nm, :n), "
                "#rl = if_not_exists(#rl, :r), "
                "#pl = if_not_exists(#pl, :p), "
                "#st = if_not_exists(#st, :s), "
                "createdAt = if_not_exists(createdAt, :c), "
                "lastLogin = :l"
            ),
            ExpressionAttributeNames={
                "#nm": "name",
                "#rl": "role",
                "#pl": "plan",
                "#st": "status",
            },
            ExpressionAttributeValues={
                ":e": email,
                ":n": name or "",
                ":r": "owner",
                ":p": "beta",
                ":s": "active",
                ":c": now_iso,
                ":l": now_iso,
            },
            ReturnValues="NONE",
        )
    except ClientError:
        # Profile upsert is best-effort — never block login on DDB hiccups.
        pass
