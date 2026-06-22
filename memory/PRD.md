# OraOne — PRD & Progress Log

## Original Problem Statement
Pull the public repo https://github.com/varunjakkampudi-tech/oraone.git (AWS Cognito + DynamoDB stack), set it up to run on the Emergent preview, and fix the signup and login functionality. Test user: `test@gmail.com` / `OraOne@2026`.

## Architecture
- **Backend**: FastAPI (Python 3.11) on port 8001 via supervisor
  - Auth: AWS Cognito (User Pool `ap-south-2_hbzHCGsK9`, App Client `2v4a1aufa8cqkvc09963ols01a`, region `ap-south-2`)
  - User profiles: AWS DynamoDB table `oraone-users` (lazy upsert on login)
  - JWT verification: JWKS-based RS256 (Cognito access tokens), middleware in `app/middleware/jwt_auth.py`
  - Legacy app data (agents, leads, etc.): MongoDB via Motor
- **Frontend**: React (CRA + Craco) on port 3000, talks to backend via `REACT_APP_BACKEND_URL/api`
  - Auth flows: email/password (USER_PASSWORD_AUTH) + Hosted-UI option (code exchange)
  - Tokens stored in `localStorage` under `oraone_access_token` / `oraone_refresh_token`

## User Personas
- SMB owners onboarding AI agents (voice, chat, WhatsApp) to handle conversations.
- Test/dev users validating auth & dashboard flows.

## Core Requirements (static)
- Cognito-backed signup with email verification code
- Email/password login → JWT access + refresh tokens
- Authenticated `/api/auth/me` profile fetch
- Forgot/reset password
- Dashboard (overview/agents/leads/conversations/etc.) gated behind auth
- Branded loading + empty states across every authenticated screen

## What's Been Implemented

### Session 1 — Auth setup (2026-06-22)
- Set up `/app/backend/.env` with AWS credentials, Cognito IDs, MongoDB URL, CORS.
- Set up `/app/frontend/.env` with preview URL for `REACT_APP_BACKEND_URL` and Cognito client vars.
- Installed boto3 / python-jose / requests Python deps.
- Cognito app client fix: enabled `ALLOW_USER_PASSWORD_AUTH` and added preview URL to CallbackURLs / LogoutURLs via `update_user_pool_client`.
- Test user fix: `test@gmail.com` was in `FORCE_CHANGE_PASSWORD` state. Set permanent password `OraOne@2026` via `admin_set_user_password`.
- Testing subagent (iteration_1): 13/13 acceptance criteria pass.

### Session 2 — Local-dev parity (2026-06-22)
- Created `backend/.env.local.example` + `frontend/.env.local.example` with localhost URLs.
- Wrote `/app/LOCAL_SETUP.md` with full local setup + troubleshooting table.
- Updated `.gitignore` to allow committing `.env*example` templates.

### Session 3 — Navbar Login/Start Free fix (2026-06-22)
- Navbar `Login` + `Start Free` (desktop + mobile) were redirecting to AWS Cognito Hosted UI which failed with `invalid_scope`.
- Routed all 4 callsites to in-app `/login` and `/signup` instead.
- Fixed Hosted UI scope in `cognito.js`: `openid email phone` → `openid email profile` (matches app client `AllowedOAuthScopes`).

### Session 4 — Loader redesign + EmptyState wiring (2026-06-22) of `/app/frontend/src/components/ui/OraOneLoader.jsx`:
  - New **AuraOrb** signature visual: breathing gradient sphere + orbiting arc + 3 expanding ripple rings.
  - New **ConversationBars**: EQ-style waveform bars dancing on each side.
  - New **wordmark sweep** + tri-color progress bar.
  - All exports preserved (drop-in compatible): `OraOneLoader`, `ButtonSpinner`, `InlineLoader`, `DotsLoader`, `ChatTyping`, `Skeleton`, `CardSkeleton`, `TableSkeleton`, `EmptyStateLoader`, `ProgressStages`, `TopProgressBar`, `PageTransition`. Added: `AuraOrb`.
  - New CSS keyframes in `index.css`: `aura-ripple`, `aura-breathe`, `wave-bar`, `wordmark-sweep`; updated `loader-progress`, `dot-bounce`.
- Rewrote `/app/frontend/src/components/ui/EmptyState.jsx` to use `AuraOrb` as default visual (backward-compat `icon` prop still supported); added `size`, `dashed`, `secondaryLabel/onSecondary` props.
- Wired branded empty states into:
  - `pages/dashboard/Leads.jsx` (table-empty branch when `leads.length === 0`)
  - `pages/dashboard/Conversations.jsx` (list-empty when no filter match + panel-empty when no conv selected)
  - `pages/dashboard/KnowledgeBase.jsx` (replaced bare `No documents found.` line)
- Fixed `LoaderShowcase.jsx` page-transition tile (was rendering a black square due to missing logo asset) → now uses `AuraOrb`.
- Testing subagent (iteration_2): 11/11 acceptance criteria pass.

### Session 5 — Remove Hosted UI buttons + Postgres foundation (2026-06-22)
- Removed `Continue with Cognito Hosted UI` button from `/login` and `Sign up with Cognito Hosted UI` from `/signup` (per user request); pruned unused `loginWithHostedUI` imports.
- **Postgres data layer** scaffolded against AWS RDS `oraone-postgres.c38080q04ynb.ap-south-2.rds.amazonaws.com:5432/oraone`:
  - Added `asyncpg`, `psycopg2-binary`, `SQLAlchemy 2.x`, `alembic` to `requirements.txt`.
  - `backend/app/db/` package: async engine + sessionmaker (`session.py`), declarative `Base` + `UUIDPrimaryKeyMixin` + `TimestampMixin` (`base.py`), and 8 ORM models under `app/db/models/`:
    - `users` (1:1 with Cognito via `cognito_sub`), `organizations`, `organization_members`, `agents`, `agent_configs`, `conversations`, `messages`, `integrations`.
  - 11 Postgres ENUMs centralised in the initial migration `alembic/versions/20260622_0001_initial_initial.py`.
  - Alembic configured (`alembic.ini`, `alembic/env.py`, `script.py.mako`); initial migration runs cleanly in `--sql` mode (verified: 11 CREATE TYPE + 9 CREATE TABLE statements, no duplicates).
  - `GET /api/db/health` endpoint added — returns `{ok, version, tables[]}` or a `503 db_unreachable: ...` with the underlying error.
  - Backend boots even when RDS unreachable (engine is initialised lazily; private VPC pod can't reach `10.0.130.156`).
- `LOCAL_SETUP.md` referenced; new `DATABASE_SETUP.md` written with full migration + troubleshooting guide.

## Prioritized Backlog
- **P0**: Run `alembic upgrade head` against RDS from a machine with VPC access (laptop on VPN, EC2 in same VPC, or temporarily flip RDS to publicly accessible + whitelist IP). After that, `/api/db/health` will return `200 ok` with all 8 tables listed.
- **P1**: Switch the Cognito post-login user-upsert from DynamoDB → Postgres `users`. Auto-create a personal `organization` + `organization_members` row on first login.
- **P1**: Migrate `MongoDB.agents` and `MongoDB.leads` into Postgres `agents` + `conversations` and retire the Motor client.
- **P1**: Wire dashboard widgets to live data (currently use mockData for sparkles/leaderboard).
- **P1**: Complete onboarding step pages → `/api/onboarding/complete` round-trip.
- **P2**: Pin `CORS_ORIGINS` to allowed hosts (not `*`); re-enable credentials.
- **P2**: Add at-rest encryption layer for `integrations.credentials` JSONB.
- **P2**: Fix Recharts `width(-1) height(-1)` warnings on `/app/overview`.
- **P2**: Split `Conversations.jsx` (~450 lines).
- **P3**: Document EmptyState testId convention in `constants/testIds.js`.
- **P3**: Refactor `server.py` into `app/api/*` modules.
- **P3**: Add Row-Level Security policies enforcing `org_id = current_setting('app.org_id')`.

## Next Tasks
- Apply the initial migration to RDS from a VPC-capable host.
- Confirm with user whether to proceed with Phase 2 (Cognito → Postgres user upsert + Mongo → Postgres data migration) or dashboard/onboarding wiring next.

## Notes
- AWS keys live ONLY in `/app/backend/.env` (never committed).
- Cognito Hosted UI works for `localhost:3000` and the current preview URL.
- `/__loaders` is an internal developer QA route — not linked from public nav.
