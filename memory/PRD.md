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

### Session 4 — Loader redesign + EmptyState wiring (2026-06-22)
- Full rewrite of `/app/frontend/src/components/ui/OraOneLoader.jsx`:
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

## Prioritized Backlog
- **P1**: Wire dashboard widgets to live data (currently use mockData for sparkles/leaderboard).
- **P1**: Complete onboarding step pages → `/api/onboarding/complete` round-trip.
- **P2**: Pin `CORS_ORIGINS` to allowed hosts (not `*`); re-enable credentials.
- **P2**: Fix Recharts `width(-1) height(-1)` warnings on `/app/overview` (ResponsiveContainer parents need explicit dimensions).
- **P2**: Split `Conversations.jsx` (now ~450 lines) — extract `ConversationPanel` into its own file.
- **P3**: Document EmptyState testId convention `${testId}-action` / `${testId}-secondary` in `constants/testIds.js`.
- **P3**: Refactor `server.py` (290+ lines) into `app/api/*` modules.
- **P3**: Update stale test assertion `test_cognito_auth.py::TestResend::test_resend_nonexistent_email_returns_404` (current anti-enumeration 200 response is correct).

## Next Tasks
- Confirm with user whether to continue with dashboard data wiring, onboarding flow, Recharts warnings cleanup, or another area.

## Notes
- AWS keys live ONLY in `/app/backend/.env` (never committed).
- Cognito Hosted UI works for `localhost:3000` and the current preview URL; if the preview URL changes, re-run the boto3 update to add the new callback / logout URLs.
- `/__loaders` is an internal developer QA route showcasing every loader variant — not linked from public nav.
