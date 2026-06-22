"""User — the system-of-record for an authenticated identity.

Linked 1:1 to a Cognito user via `cognito_sub`. Created lazily on first
successful login (auth_service will upsert by cognito_sub).
"""
from __future__ import annotations

import enum
from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlalchemy import DateTime, Enum, Index, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.db.models.organization import Organization
    from app.db.models.organization_member import OrganizationMember


class UserRole(str, enum.Enum):
    owner = "owner"
    admin = "admin"
    member = "member"


class UserStatus(str, enum.Enum):
    active = "active"
    suspended = "suspended"
    deleted = "deleted"


class User(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "users"
    __table_args__ = (
        UniqueConstraint("cognito_sub", name="uq_users_cognito_sub"),
        UniqueConstraint("email", name="uq_users_email"),
        Index("ix_users_email", "email"),
    )

    cognito_sub: Mapped[str] = mapped_column(String(64), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[Optional[str]] = mapped_column(String(160))
    avatar_url: Mapped[Optional[str]] = mapped_column(String(500))

    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role"),
        nullable=False,
        default=UserRole.owner,
    )
    status: Mapped[UserStatus] = mapped_column(
        Enum(UserStatus, name="user_status"),
        nullable=False,
        default=UserStatus.active,
    )
    last_login_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))

    # Relationships
    owned_orgs: Mapped[list["Organization"]] = relationship(
        back_populates="owner", foreign_keys="Organization.owner_id"
    )
    memberships: Mapped[list["OrganizationMember"]] = relationship(
        back_populates="user", foreign_keys="OrganizationMember.user_id"
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<User {self.email}>"
