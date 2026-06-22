"""Cognito JWT verification middleware (JWKS-based, no shared secret).

Follows AWS guidance: fetch JWKS, locate key by `kid`, verify signature,
then validate `exp`, `iss`, `aud`/`client_id` and `token_use`.
"""
from datetime import datetime, timezone
from functools import lru_cache
from typing import Any, Dict

import httpx
from fastapi import HTTPException, Request, status
from jose import jwk, jwt as jose_jwt
from jose.utils import base64url_decode

from app.core.config import settings


_UNAUTHORIZED = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Not authenticated.",
    headers={"WWW-Authenticate": "Bearer"},
)


@lru_cache(maxsize=1)
def _fetch_jwks() -> Dict[str, Any]:
    with httpx.Client(timeout=5.0) as client:
        resp = client.get(settings.jwks_url)
        resp.raise_for_status()
        return resp.json()


def _get_public_key(token: str) -> Dict[str, Any]:
    try:
        headers = jose_jwt.get_unverified_header(token)
    except Exception:
        raise _UNAUTHORIZED
    kid = headers.get("kid")
    if not kid:
        raise _UNAUTHORIZED

    jwks = _fetch_jwks()
    for key in jwks.get("keys", []):
        if key.get("kid") == kid:
            return key

    # Key rotation — refresh JWKS once and retry.
    _fetch_jwks.cache_clear()
    jwks = _fetch_jwks()
    for key in jwks.get("keys", []):
        if key.get("kid") == kid:
            return key

    raise _UNAUTHORIZED


def verify_cognito_token(token: str) -> Dict[str, Any]:
    """Verify a Cognito-issued JWT (access or id token) and return claims."""
    public_key_dict = _get_public_key(token)
    key_obj = jwk.construct(public_key_dict)

    try:
        message, encoded_sig = token.rsplit(".", 1)
        decoded_sig = base64url_decode(encoded_sig.encode("utf-8"))
    except Exception:
        raise _UNAUTHORIZED

    if not key_obj.verify(message.encode("utf-8"), decoded_sig):
        raise _UNAUTHORIZED

    try:
        claims = jose_jwt.get_unverified_claims(token)
    except Exception:
        raise _UNAUTHORIZED

    # exp
    exp = claims.get("exp")
    if not isinstance(exp, (int, float)):
        raise _UNAUTHORIZED
    if datetime.now(timezone.utc).timestamp() > exp + settings.jwt_leeway_seconds:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # iss
    if claims.get("iss") != settings.jwt_issuer:
        raise _UNAUTHORIZED

    # token_use must be 'access' (we use access tokens for API auth)
    if claims.get("token_use") != "access":
        raise _UNAUTHORIZED

    # access tokens use 'client_id' (id tokens use 'aud')
    if claims.get("client_id") != settings.cognito_app_client_id:
        raise _UNAUTHORIZED

    return claims


def _extract_bearer_token(request: Request) -> str:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise _UNAUTHORIZED
    token = auth[7:].strip()
    if not token:
        raise _UNAUTHORIZED
    return token


async def get_current_user_claims(request: Request) -> Dict[str, Any]:
    """FastAPI dependency: validates Bearer token and returns Cognito claims."""
    token = _extract_bearer_token(request)
    return verify_cognito_token(token)


async def get_current_access_token(request: Request) -> str:
    """FastAPI dependency that returns the validated raw access token."""
    token = _extract_bearer_token(request)
    verify_cognito_token(token)
    return token
