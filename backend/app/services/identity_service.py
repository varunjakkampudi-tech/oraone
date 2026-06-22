"""IdentityService — the bridge between Cognito (auth-of-record) and our
Postgres `users` + `organizations` + `organization_members` triad.

`upsert_from_cognito` is meant to be called once on every successful
login: it finds-or-creates the user, and on first-touch also auto-creates
a personal organisation with the user as owner.
"""
from __future__ import annotations

from typing import NamedTuple, Optional

from sqlalchemy.ext.asyncio import AsyncSession

from app.database.models.organization import Organization, OrgPlan
from app.database.models.organization_member import (
    MemberRole,
    OrganizationMember,
)
from app.database.models.user import User
from app.database.repositories.organization_member_repository import (
    OrganizationMemberRepository,
)
from app.database.repositories.organization_repository import (
    OrganizationRepository,
)
from app.database.repositories.user_repository import UserRepository


class IdentityResult(NamedTuple):
    user: User
    organization: Organization
    membership: OrganizationMember
    is_new_user: bool


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
    ) -> IdentityResult:
        """Idempotent identity hydration on Cognito login.

        First call: creates the User + a personal Organization + an Owner
        OrganizationMember row.
        Subsequent calls: returns the existing triple, refreshing
        `last_login_at` and any newly-supplied profile fields.
        """
        existing = await self.users.get_by_cognito_sub(cognito_sub)
        is_new_user = existing is None

        user = await self.users.upsert_from_cognito(
            cognito_sub=cognito_sub,
            email=email,
            full_name=full_name,
            avatar_url=avatar_url,
        )

        orgs = await self.orgs.list_for_user(user.id)
        if orgs:
            organization = orgs[0]
        else:
            display = (full_name or email.split("@")[0]).strip()
            slug = await self.orgs.ensure_unique_slug(f"{display}-workspace")
            organization = Organization(
                name=f"{display} Workspace",
                slug=slug,
                plan=OrgPlan.free,
                owner_user_id=user.id,
            )
            self.session.add(organization)
            await self.session.flush()

        membership = await self.members.ensure_membership(
            organization_id=organization.id,
            user_id=user.id,
            role=MemberRole.owner if organization.owner_user_id == user.id else MemberRole.member,
        )

        return IdentityResult(
            user=user,
            organization=organization,
            membership=membership,
            is_new_user=is_new_user,
        )
