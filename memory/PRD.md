# OraOne — PRD (Snapshot)

## Original Problem Statement
Pull the public repo https://github.com/varunjakkampudi-tech/oraone.git, understand it, install dependencies, configure env (AWS Cognito, RDS Postgres, DynamoDB, local Mongo for legacy collections), and run it in the Emergent preview pod.

## What it is
OraOne — "One AI. Every Conversation." SaaS landing + dashboard for AI Voice / Chat / WhatsApp agents that capture leads 24/7. Tagline: "Never Miss A Lead. Never Miss A Sale."

## Architecture
- **Frontend**: React 19 (CRA + craco), TailwindCSS, Radix UI, react-router 7, react-oidc-context, recharts, framer-motion. Served via `yarn start` on port 3000.
- **Backend**: FastAPI (`server.py` is the full app; `main.py` is a lighter auth-only variant). Mounted under `/api`. Runs via uvicorn on port 8001 (supervisor-managed).
- **Auth**: AWS Cognito User Pool (`ap-south-2_hbzHCGsK9`) — email/password via `POST /api/auth/login`, signup with email verification, hosted UI OAuth optional. JWT validation via JWKS in `app/middleware/jwt_auth.py`.
- **Datastores**:
  - **PostgreSQL (AWS RDS)** — system-of-record (users, orgs, agents, conversations, messages, integrations). Schema via Alembic. Note: RDS is in a private VPC → unreachable from this pod; engine boots lazily, `/api/db/health` returns 503 `db_unreachable` (expected, documented in DATABASE_SETUP.md).
  - **DynamoDB** (`oraone-users`) — legacy Cognito user mirror.
  - **MongoDB** (local in-pod) — legacy `agents` / `leads` demo collections.

## Key Backend Routes
- `GET /api/health` — liveness
- `GET /api/db/health` — Postgres probe (503 in this pod, by design)
- `POST /api/auth/signup`, `/api/auth/verify`, `/api/auth/resend`, `/api/auth/login`, `/api/auth/forgot-password`, `/api/auth/reset-password`, `/api/auth/logout`, `/api/auth/me`
- `GET/POST/PUT/DELETE /api/agents` (Mongo-backed)
- `GET/POST/DELETE /api/leads` (Mongo-backed)
- `POST /api/onboarding/complete`
- Contact + dashboard overview routes mounted from `app/api/`

## Implementation Status (2026-06-22)
- ✅ Repo cloned into `/app` (preserving `.git` / `.emergent` / `memory` / `test_reports`)
- ✅ `backend/.env` + `frontend/.env` populated with provided AWS/Cognito/RDS credentials + this pod's preview URL
- ✅ Python deps installed (`pip install -r requirements.txt`)
- ✅ Node deps installed (`yarn install`)
- ✅ Supervisor running backend (8001) + frontend (3000) + local mongod
- ✅ `GET /api/health` → 200 OK
- ✅ `POST /api/auth/login` with `test@gmail.com` / `OraOne@2026` → returns Cognito access_token
- ✅ Landing page renders at preview URL
- ⚠️ `GET /api/db/health` → 503 (RDS in private VPC, expected per DATABASE_SETUP.md)

## URLs
- Preview: https://3e6d33e3-d507-434a-af3b-05308771435d.preview.emergentagent.com
- API base: same URL + `/api`

## Backlog / Next Action Items
- Phase 2 (per repo TODO): switch Cognito post-login user-upsert from DynamoDB → Postgres `users`; auto-create personal org + membership; migrate Mongo agents/leads → Postgres.
- Rotate the AWS keys & RDS password that were posted in chat — they're now public.
- If Postgres access is needed from this pod, either flip RDS to publicly accessible + whitelist egress IP, or stand up an SSH tunnel via a bastion.
