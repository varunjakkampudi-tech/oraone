"""Agent repository."""
from __future__ import annotations

import uuid

from sqlalchemy import select

from app.db.models.agent import Agent, AgentStatus
from app.repositories.base import BaseRepository


class AgentRepository(BaseRepository[Agent]):
    model = Agent

    async def list_for_org(self, organization_id: uuid.UUID) -> list[Agent]:
        q = (
            select(Agent)
            .where(Agent.organization_id == organization_id)
            .where(Agent.deleted_at.is_(None))
            .order_by(Agent.created_at.desc())
        )
        return list((await self.session.scalars(q)).all())

    async def list_active_for_org(self, organization_id: uuid.UUID) -> list[Agent]:
        q = (
            select(Agent)
            .where(Agent.organization_id == organization_id)
            .where(Agent.status == AgentStatus.active)
            .where(Agent.deleted_at.is_(None))
        )
        return list((await self.session.scalars(q)).all())
