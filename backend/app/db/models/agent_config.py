"""AgentConfig — 1:1 typed configuration + JSONB extras for an Agent."""
from __future__ import annotations

import uuid
from typing import TYPE_CHECKING, Any, Optional

from sqlalchemy import ForeignKey, Numeric, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.db.models.agent import Agent


class AgentConfig(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    __tablename__ = "agent_configs"
    __table_args__ = (
        UniqueConstraint("agent_id", name="uq_agent_configs_agent"),
    )

    agent_id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey("agents.id", ondelete="CASCADE"),
        nullable=False,
    )

    # Core typed config
    model: Mapped[str] = mapped_column(String(80), nullable=False, default="gpt-4o-mini")
    voice: Mapped[Optional[str]] = mapped_column(String(80))
    language: Mapped[str] = mapped_column(String(16), nullable=False, default="en-US")
    system_prompt: Mapped[Optional[str]] = mapped_column(Text)
    greeting: Mapped[Optional[str]] = mapped_column(Text)
    temperature: Mapped[float] = mapped_column(
        Numeric(3, 2), nullable=False, default=0.70
    )
    max_tokens: Mapped[int] = mapped_column(nullable=False, default=1024)

    # Channel-specific or extra config (e.g. Twilio number, webhook URLs, tools)
    extra: Mapped[dict[str, Any]] = mapped_column(
        JSONB, nullable=False, default=dict, server_default="{}"
    )

    # Relationship
    agent: Mapped["Agent"] = relationship(back_populates="config")
