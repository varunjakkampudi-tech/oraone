# OraOne — Setup Run

## Original problem statement
Pull the public repo https://github.com/varunjakkampudi-tech/oraone.git and wire the
app to AWS (Cognito + DynamoDB + RDS Postgres) using the provided env values. Provide
env files for both production and local (localhost) development.

## What was done (2026-06-22)
- Verified `/app` is already a checkout of `varunjakkampudi-tech/oraone` and ran
  `git pull origin main` (already up to date).
- Created `/app/backend/.env` and `/app/frontend/.env` using the supplied AWS
  Cognito / DynamoDB / RDS / IAM values.
- Frontend URL & Cognito redirect updated to this pod's actual preview URL
  (`https://9ac7729c-...preview.emergentagent.com`). The originally supplied URL
  (`3e6d33e3-...`) belongs to a different, sleeping Emergent pod.
- Installed missing `greenlet` (required by SQLAlchemy async + asyncpg).
- Created production + local templates:
  - `/app/backend/.env.production.example`, `/app/backend/.env.local.example`
  - `/app/frontend/.env.production.example`, `/app/frontend/.env.local.example`

## Service status
- Backend (FastAPI) — RUNNING on :8001
- Frontend (CRA dev) — RUNNING on :3000
- MongoDB (local) — RUNNING
- AWS Cognito JWT middleware — initialised
- AWS RDS Postgres — TIMEOUT (security group does not allow this pod's IP
  `104.198.214.223`). All non-Postgres routes work.

## Action items for user
1. **AWS RDS**: Add inbound rule for TCP/5432 from `104.198.214.223/32` (or
   `0.0.0.0/0` for quick testing) in the `oraone-postgres` security group, OR
   make the RDS publicly accessible. Without this, `/api/health/db`, `/api/v2/*`,
   `/api/agents`, `/api/knowledge` will fail.
2. **AWS Cognito App Client**: Add the new redirect URL
   `https://9ac7729c-...preview.emergentagent.com/auth/callback` to the
   Allowed callback URLs list. Also add `http://localhost:3000/auth/callback`
   for local dev.
3. **Security**: The provided AWS access keys and DB password are in plain
   text in chat — recommend rotating once setup is verified.

## Backlog / next iterations
- P1 — Verify auth signup → email verify → login flow against Cognito.
- P1 — Once RDS is reachable, run `alembic upgrade head` for schema bootstrap.
- P2 — Add boto3 `Mako` to requirements (alembic dep warning during pip install).
