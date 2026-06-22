"""Agent — an AI worker (voice / chat / WhatsApp) owned by an organization."""
from __future__ import annotations

import enum
import uuid
from typing import TYPE_CHECKING, Optional

from sqlalchemy import Enum, ForeignKey, Index, String, Text
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.db.models.organization import Organization
    from app.db.models.user import User
    from app.db.models.agent_config import AgentConfig
    from app.db.models.conversation import Conversation


class AgentChannel(str, enum.Enum):
    voice = "voice"
    chat = "chat"
    whatsapp = "whatsapp"


class AgentStatus(str, enum.Enum):
    draft = "draft"
    active = "active"
    paused = "paused"
    archived = "archived"


class Agent(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "agents"
    __table_args__ = (
        Index("ix_agents_org_id", "org_id"),
        Index("ix_agents_status", "status"),
    )

    org_id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
    )
    name: Mapped[str] = mapped_column(String(160), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    channel: Mapped[AgentChannel] = mapped_column(
        Enum(AgentChannel, name="agent_channel"), nullable=False
    )
    status: Mapped[AgentStatus] = mapped_column(
        Enum(AgentStatus, name="agent_status"),
        nullable=False,
        default=AgentStatus.draft,
    )
    avatar_url: Mapped[Optional[str]] = mapped_column(String(500))

    created_by_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="SET NULL"),
    )

    # Relationships
    organization: Mapped["Organization"] = relationship(back_populates="agents")
    created_by: Mapped[Optional["User"]] = relationship()
    config: Mapped[Optional["AgentConfig"]] = relationship(
        back_populates="agent",
        uselist=False,
        cascade="all, delete-orphan",
    )
    conversations: Mapped[list["Conversation"]] = relationship(
        back_populates="agent", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:  # pragma: no cover
        return f"<Agent {self.name} ({self.channel})>"
