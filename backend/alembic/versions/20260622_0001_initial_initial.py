"""initial schema — users, organizations, organization_members, agents,
agent_configs, conversations, messages, integrations.

Revision ID: 0001_initial
Revises:
Create Date: 2026-06-22
"""
from __future__ import annotations

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "0001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


# Enum types (created once, reused across tables that need them).
# `create_type=False` prevents SQLAlchemy from re-creating the enum during CREATE TABLE.
user_role_enum = postgresql.ENUM(
    "owner", "admin", "member", name="user_role", create_type=False
)
user_status_enum = postgresql.ENUM(
    "active", "suspended", "deleted", name="user_status", create_type=False
)
org_plan_enum = postgresql.ENUM(
    "free", "starter", "growth", "enterprise", name="org_plan", create_type=False
)
member_role_enum = postgresql.ENUM(
    "owner", "admin", "member", "viewer", name="member_role", create_type=False
)
member_status_enum = postgresql.ENUM(
    "active", "invited", "removed", name="member_status", create_type=False
)
agent_channel_enum = postgresql.ENUM(
    "voice", "chat", "whatsapp", name="agent_channel", create_type=False
)
agent_status_enum = postgresql.ENUM(
    "draft", "active", "paused", "archived", name="agent_status", create_type=False
)
conversation_status_enum = postgresql.ENUM(
    "active", "completed", "qualified", "failed", "lost",
    name="conversation_status", create_type=False
)
message_role_enum = postgresql.ENUM(
    "agent", "customer", "system", "tool",
    name="message_role", create_type=False
)
integration_type_enum = postgresql.ENUM(
    "voice", "sms", "email", "whatsapp", "crm", "calendar",
    "storage", "analytics", "other",
    name="integration_type", create_type=False
)
integration_status_enum = postgresql.ENUM(
    "disconnected", "connected", "error",
    name="integration_status", create_type=False
)


# Authoritative list of all enum (name, values) pairs so we can CREATE/DROP
# them exactly once in upgrade() / downgrade().
_ALL_ENUMS: tuple[tuple[str, tuple[str, ...]], ...] = (
    ("user_role", ("owner", "admin", "member")),
    ("user_status", ("active", "suspended", "deleted")),
    ("org_plan", ("free", "starter", "growth", "enterprise")),
    ("member_role", ("owner", "admin", "member", "viewer")),
    ("member_status", ("active", "invited", "removed")),
    ("agent_channel", ("voice", "chat", "whatsapp")),
    ("agent_status", ("draft", "active", "paused", "archived")),
    ("conversation_status",
     ("active", "completed", "qualified", "failed", "lost")),
    ("message_role", ("agent", "customer", "system", "tool")),
    ("integration_type",
     ("voice", "sms", "email", "whatsapp", "crm", "calendar",
      "storage", "analytics", "other")),
    ("integration_status", ("disconnected", "connected", "error")),
)


def upgrade() -> None:
    # Create all enums up front using raw SQL so it works in both online and
    # `--sql` (offline) modes. Each ENUM is created exactly once.
    for name, values in _ALL_ENUMS:
        vals = ", ".join(f"'{v}'" for v in values)
        op.execute(f"CREATE TYPE {name} AS ENUM ({vals})")

    # -------- users --------
    op.create_table(
        "users",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("cognito_sub", sa.String(64), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("name", sa.String(160)),
        sa.Column("avatar_url", sa.String(500)),
        sa.Column(
            "role", user_role_enum,
            nullable=False, server_default="owner",
        ),
        sa.Column(
            "status", user_status_enum,
            nullable=False, server_default="active",
        ),
        sa.Column("last_login_at", sa.DateTime(timezone=True)),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.UniqueConstraint("cognito_sub", name="uq_users_cognito_sub"),
        sa.UniqueConstraint("email", name="uq_users_email"),
    )
    op.create_index("ix_users_email", "users", ["email"])

    # -------- organizations --------
    op.create_table(
        "organizations",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(160), nullable=False),
        sa.Column("slug", sa.String(80), nullable=False),
        sa.Column("plan", org_plan_enum, nullable=False, server_default="free"),
        sa.Column(
            "owner_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="RESTRICT"),
            nullable=False,
        ),
        sa.Column("settings", postgresql.JSONB, nullable=False, server_default=sa.text("'{}'::jsonb")),
        sa.Column("logo_url", sa.String(500)),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.UniqueConstraint("slug", name="uq_organizations_slug"),
    )
    op.create_index("ix_organizations_owner_id", "organizations", ["owner_id"])

    # -------- organization_members --------
    op.create_table(
        "organization_members",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "org_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("organizations.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "user_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("role", member_role_enum, nullable=False, server_default="member"),
        sa.Column("status", member_status_enum, nullable=False, server_default="active"),
        sa.Column(
            "invited_by_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="SET NULL"),
        ),
        sa.Column("joined_at", sa.DateTime(timezone=True)),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.UniqueConstraint("org_id", "user_id", name="uq_org_members_org_user"),
    )
    op.create_index("ix_org_members_user_id", "organization_members", ["user_id"])
    op.create_index("ix_org_members_org_id", "organization_members", ["org_id"])

    # -------- agents --------
    op.create_table(
        "agents",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "org_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("organizations.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("name", sa.String(160), nullable=False),
        sa.Column("description", sa.Text),
        sa.Column("channel", agent_channel_enum, nullable=False),
        sa.Column("status", agent_status_enum, nullable=False, server_default="draft"),
        sa.Column("avatar_url", sa.String(500)),
        sa.Column(
            "created_by_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id", ondelete="SET NULL"),
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
    )
    op.create_index("ix_agents_org_id", "agents", ["org_id"])
    op.create_index("ix_agents_status", "agents", ["status"])

    # -------- agent_configs --------
    op.create_table(
        "agent_configs",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "agent_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("agents.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("model", sa.String(80), nullable=False, server_default="gpt-4o-mini"),
        sa.Column("voice", sa.String(80)),
        sa.Column("language", sa.String(16), nullable=False, server_default="en-US"),
        sa.Column("system_prompt", sa.Text),
        sa.Column("greeting", sa.Text),
        sa.Column("temperature", sa.Numeric(3, 2), nullable=False, server_default=sa.text("0.70")),
        sa.Column("max_tokens", sa.Integer, nullable=False, server_default=sa.text("1024")),
        sa.Column("extra", postgresql.JSONB, nullable=False, server_default=sa.text("'{}'::jsonb")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.UniqueConstraint("agent_id", name="uq_agent_configs_agent"),
    )

    # -------- conversations --------
    op.create_table(
        "conversations",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "org_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("organizations.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "agent_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("agents.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("channel", agent_channel_enum, nullable=False),
        sa.Column("status", conversation_status_enum, nullable=False, server_default="active"),
        sa.Column("customer_name", sa.String(160)),
        sa.Column("customer_email", sa.String(255)),
        sa.Column("customer_phone", sa.String(40)),
        sa.Column("started_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("ended_at", sa.DateTime(timezone=True)),
        sa.Column("duration_seconds", sa.Integer),
        sa.Column("summary", sa.String(2000)),
        sa.Column("recording_url", sa.String(500)),
        sa.Column("transcript_url", sa.String(500)),
        sa.Column("extra", postgresql.JSONB, nullable=False, server_default=sa.text("'{}'::jsonb")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
    )
    op.create_index("ix_conversations_org_id", "conversations", ["org_id"])
    op.create_index("ix_conversations_agent_id", "conversations", ["agent_id"])
    op.create_index("ix_conversations_status", "conversations", ["status"])
    op.create_index("ix_conversations_started_at", "conversations", ["started_at"])

    # -------- messages --------
    op.create_table(
        "messages",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "conversation_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("conversations.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("role", message_role_enum, nullable=False),
        sa.Column("content", sa.Text, nullable=False),
        sa.Column("audio_url", sa.String(500)),
        sa.Column("extra", postgresql.JSONB, nullable=False, server_default=sa.text("'{}'::jsonb")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
    )
    op.create_index("ix_messages_conversation_id", "messages", ["conversation_id"])
    op.create_index(
        "ix_messages_conversation_created", "messages",
        ["conversation_id", "created_at"],
    )

    # -------- integrations --------
    op.create_table(
        "integrations",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "org_id", postgresql.UUID(as_uuid=True),
            sa.ForeignKey("organizations.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("provider", sa.String(60), nullable=False),
        sa.Column("type", integration_type_enum, nullable=False),
        sa.Column(
            "status", integration_status_enum,
            nullable=False, server_default="disconnected",
        ),
        sa.Column("credentials", postgresql.JSONB, nullable=False, server_default=sa.text("'{}'::jsonb")),
        sa.Column("settings", postgresql.JSONB, nullable=False, server_default=sa.text("'{}'::jsonb")),
        sa.Column("last_synced_at", sa.DateTime(timezone=True)),
        sa.Column("last_error", sa.String(1000)),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.UniqueConstraint("org_id", "provider", name="uq_integrations_org_provider"),
    )
    op.create_index("ix_integrations_org_id", "integrations", ["org_id"])
    op.create_index("ix_integrations_status", "integrations", ["status"])


def downgrade() -> None:
    op.drop_table("integrations")
    op.drop_table("messages")
    op.drop_table("conversations")
    op.drop_table("agent_configs")
    op.drop_table("agents")
    op.drop_table("organization_members")
    op.drop_table("organizations")
    op.drop_table("users")

    # Drop enums in reverse order
    for name, _ in reversed(_ALL_ENUMS):
        op.execute(f"DROP TYPE IF EXISTS {name}")
