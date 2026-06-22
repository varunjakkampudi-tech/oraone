"""Organization — the multi-tenant boundary."""
from __future__ import annotations

import enum
import uuid
from typing import TYPE_CHECKING, Any, Optional

from sqlalchemy import Enum, ForeignKey, Index, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.db.models.user import User
    from app.db.models.organization_member import OrganizationMember
    from app.db.models.agent import Agent
    from app.db.models.integration import Integration


class OrgPlan(str, enum.Enum):
    free = "free"
    starter = "starter"
    growth = "growth"
    enterprise = "enterprise"


class Organization(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "organizations"
    __table_args__ = (
        UniqueConstraint("slug", name="uq_organizations_slug"),
        Index("ix_organizations_owner_id", "owner_id"),
    )

    name: Mapped[str] = mapped_column(String(160), nullable=False)
    slug: Mapped[str] = mapped_column(String(80), nullable=False)
    plan: Mapped[OrgPlan] = mapped_column(
        Enum(OrgPlan, name="org_plan"),
        nullable=False,
        default=OrgPlan.free,
    )

    owner_id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
    )
    settings: Mapped[dict[str, Any]] = mapped_column(
        JSONB, nullable=False, default=dict, server_default="{}"
    )
    logo_url: Mapped[Optional[str]] = mapped_column(String(500))

    # Relationships
    owner: Mapped["User"] = relationship(
        back_populates="owned_orgs", foreign_keys=[owner_id]
    )
    members: Mapped[list["OrganizationMember"]] = relationship(
        back_populates="organization",
        cascade="all, delete-orphan",
    )
    agents: Mapped[list["Agent"]] = relationship(
        back_populates="organization", cascade="all, delete-orphan"
    )
    integrations: Mapped[list["Integration"]] = relationship(
        back_populates="organization", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Organization {self.slug}>"
