"""SQLAlchemy ORM models. Import this package to register tables with Base."""

from app.db.models.user import User, UserRole, UserStatus
from app.db.models.organization import Organization, OrgPlan
from app.db.models.organization_member import (
    OrganizationMember,
    MemberRole,
    MemberStatus,
)
from app.db.models.agent import Agent, AgentChannel, AgentStatus
from app.db.models.agent_config import AgentConfig
from app.db.models.conversation import Conversation, ConversationStatus
from app.db.models.message import Message, MessageRole
from app.db.models.integration import (
    Integration,
    IntegrationStatus,
    IntegrationType,
)

__all__ = [
    "User", "UserRole", "UserStatus",
    "Organization", "OrgPlan",
    "OrganizationMember", "MemberRole", "MemberStatus",
    "Agent", "AgentChannel", "AgentStatus",
    "AgentConfig",
    "Conversation", "ConversationStatus",
    "Message", "MessageRole",
    "Integration", "IntegrationStatus", "IntegrationType",
]
