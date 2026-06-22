"""Auth API routes.

POST /api/auth/signup
POST /api/auth/verify
POST /api/auth/resend
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/logout
GET  /api/auth/me
"""
from fastapi import APIRouter, Depends, HTTPException, status

from app.middleware.jwt_auth import get_current_access_token, get_current_user_claims
from app.schemas.auth import (
    CodeExchangeRequest,
    ConfirmForgotPasswordRequest,
    ConfirmSignUpRequest,
    ForgotPasswordRequest,
    LoginRequest,
    MessageResponse,
    RefreshTokenRequest,
    ResendConfirmationRequest,
    SignUpRequest,
    TokensResponse,
    UserProfile,
)
from app.services import auth_service, user_service


router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup", response_model=MessageResponse)
def signup(payload: SignUpRequest):
    result = auth_service.sign_up(payload)
    return MessageResponse(
        message=(
            "Verification code sent to your email."
            if not result.get("user_confirmed")
            else "Account created. You can now log in."
        )
    )


@router.post("/verify", response_model=MessageResponse)
def verify(payload: ConfirmSignUpRequest):
    auth_service.confirm_sign_up(payload)
    return MessageResponse(message="Email verified. You can now log in.")


@router.post("/resend", response_model=MessageResponse)
def resend(payload: ResendConfirmationRequest):
    auth_service.resend_confirmation_code(payload)
    return MessageResponse(message="A new verification code has been sent.")


@router.post("/login", response_model=TokensResponse)
def login(payload: LoginRequest):
    return auth_service.login(payload)


@router.post("/exchange", response_model=TokensResponse)
def exchange_code(payload: CodeExchangeRequest):
    return auth_service.exchange_authorization_code(payload)


@router.post("/refresh", response_model=TokensResponse)
def refresh(payload: RefreshTokenRequest):
    return auth_service.refresh_tokens(payload)


@router.post("/forgot-password", response_model=MessageResponse)
def forgot_password(payload: ForgotPasswordRequest):
    auth_service.forgot_password(payload)
    # Always return success-shaped message (auth_service swallows UserNotFound).
    return MessageResponse(message="If an account exists for this email, a reset code has been sent.")


@router.post("/reset-password", response_model=MessageResponse)
def reset_password(payload: ConfirmForgotPasswordRequest):
    auth_service.confirm_forgot_password(payload)
    return MessageResponse(message="Password reset successful. You can now log in.")


@router.post("/logout", response_model=MessageResponse)
def logout(access_token: str = Depends(get_current_access_token)):
    auth_service.global_sign_out(access_token)
    return MessageResponse(message="Logged out.")


@router.get("/me", response_model=UserProfile)
def me(claims: dict = Depends(get_current_user_claims)):
    user_id = claims.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token claims.")

    profile = user_service.get_user_profile(user_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found. Try logging in again.",
        )
    return profile
