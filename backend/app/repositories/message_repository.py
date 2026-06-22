"""Message repository."""
from __future__ import annotations

import uuid

from sqlalchemy import select

from app.db.models.message import Message
from app.repositories.base import BaseRepository


class MessageRepository(BaseRepository[Message]):
    model = Message

    async def list_for_conversation(
        self, conversation_id: uuid.UUID, *, limit: int = 500
    ) -> list[Message]:
        q = (
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
            .limit(limit)
        )
        return list((await self.session.scalars(q)).all())
