"""Request/response models for the auth API."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class SignUpRequest(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=120)
    password: str = Field(..., min_length=8, max_length=256)


class ConfirmSignUpRequest(BaseModel):
    email: EmailStr
    code: str = Field(..., min_length=6, max_length=6, pattern=r"^\d{6}$")


class ResendConfirmationRequest(BaseModel):
    email: EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ConfirmForgotPasswordRequest(BaseModel):
    email: EmailStr
    code: str = Field(..., min_length=6, max_length=6, pattern=r"^\d{6}$")
    new_password: str = Field(..., min_length=8, max_length=256)


class TokensResponse(BaseModel):
    access_token: str
    id_token: str
    refresh_token: Optional[str] = None
    token_type: str = "Bearer"
    expires_in: int


class UserProfile(BaseModel):
    userId: str
    email: EmailStr
    name: str
    role: str = "owner"
    plan: str = "beta"
    status: str = "active"
    createdAt: Optional[datetime] = None
    lastLogin: Optional[datetime] = None


class MessageResponse(BaseModel):
    message: str
