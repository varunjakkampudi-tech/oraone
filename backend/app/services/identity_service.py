"""IdentityService — the bridge between Cognito (auth-of-record) and our
Postgres `users` + `organizations` + `organization_members` triad.

`upsert_from_cognito` is meant to be called once on every successful
login: it finds-or-creates the user, and on first-touch also auto-creates
a personal organisation with the user as owner.
"""
from __future__ import annotations

from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.models.organization import Organization, OrgPlan
from app.db.models.organization_member import MemberRole
from app.db.models.user import User
from app.repositories.organization_member_repository import (
    OrganizationMemberRepository,
)
from app.repositories.organization_repository import OrganizationRepository
from app.repositories.user_repository import UserRepository


class IdentityService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session
        self.users = UserRepository(session)
        self.orgs = OrganizationRepository(session)
        self.members = OrganizationMemberRepository(session)

    async def upsert_from_cognito(
        self,
        *,
        cognito_sub: str,
        email: str,
        full_name: Optional[str] = None,
        avatar_url: Optional[str] = None,
    ) -> tuple[User, Organization]:
        """Idempotent: returns (user, default_org). Creates both on first login.

        The caller is responsible for committing the surrounding transaction.
        """
        user = await self.users.upsert_from_cognito(
            cognito_sub=cognito_sub,
            email=email,
            full_name=full_name,
            avatar_url=avatar_url,
        )

        # Find the first org the user owns; if none, create a personal one.
        orgs = await self.orgs.list_for_user(user.id)
        if orgs:
            default_org = orgs[0]
        else:
            base_slug = (
                (full_name or email.split("@")[0]) + "-personal"
            )
            slug = await self.orgs.ensure_unique_slug(base_slug)
            default_org = Organization(
                name=full_name or email.split("@")[0] or "My Workspace",
                slug=slug,
                plan=OrgPlan.free,
                owner_user_id=user.id,
            )
            self.session.add(default_org)
            await self.session.flush()
            await self.members.ensure_membership(
                organization_id=default_org.id,
                user_id=user.id,
                role=MemberRole.owner,
            )

        return user, default_org
