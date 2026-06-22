"""SQLAlchemy ORM models. Import this package to register tables with Base."""

from app.database.models.user import User, UserRole, UserStatus
from app.database.models.organization import Organization, OrgPlan
from app.database.models.organization_member import (
    OrganizationMember,
    MemberRole,
    MemberStatus,
)
from app.database.models.agent import Agent, AgentType, AgentStatus
from app.database.models.agent_config import AgentConfig
from app.database.models.conversation import (
    Conversation,
    ConversationChannel,
    ConversationStatus,
)
from app.database.models.message import Message, MessageSender
from app.database.models.integration import (
    Integration,
    IntegrationStatus,
    IntegrationType,
)

__all__ = [
    "User", "UserRole", "UserStatus",
    "Organization", "OrgPlan",
    "OrganizationMember", "MemberRole", "MemberStatus",
    "Agent", "AgentType", "AgentStatus",
    "AgentConfig",
    "Conversation", "ConversationChannel", "ConversationStatus",
    "Message", "MessageSender",
    "Integration", "IntegrationStatus", "IntegrationType",
]
