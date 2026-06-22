"""Repositories — thin data-access objects (one per aggregate).

Each repository takes an `AsyncSession` and exposes typed CRUD/query methods.
Services orchestrate multiple repositories and hold the business logic.

Layering:

    routes  →  services  →  repositories  →  ORM models / database
"""

from app.repositories.base import BaseRepository
from app.repositories.user_repository import UserRepository
from app.repositories.organization_repository import OrganizationRepository
from app.repositories.organization_member_repository import OrganizationMemberRepository
from app.repositories.agent_repository import AgentRepository
from app.repositories.conversation_repository import ConversationRepository
from app.repositories.message_repository import MessageRepository
from app.repositories.integration_repository import IntegrationRepository

__all__ = [
    "BaseRepository",
    "UserRepository",
    "OrganizationRepository",
    "OrganizationMemberRepository",
    "AgentRepository",
    "ConversationRepository",
    "MessageRepository",
    "IntegrationRepository",
]
