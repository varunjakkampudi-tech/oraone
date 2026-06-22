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

## What's Been Implemented (this session — 2026-06-22)
- Set up `/app/backend/.env` with AWS credentials, Cognito IDs, MongoDB URL, CORS.
- Set up `/app/frontend/.env` with preview URL for `REACT_APP_BACKEND_URL` and Cognito client vars.
- Installed boto3 / python-jose / requests Python deps.
- Cognito app client fix: enabled `ALLOW_USER_PASSWORD_AUTH` and added preview URL to CallbackURLs / LogoutURLs via `update_user_pool_client`.
- Test user fix: `test@gmail.com` was in `FORCE_CHANGE_PASSWORD` state. Set permanent password `OraOne@2026` via `admin_set_user_password`.
- Validated via Playwright that login from `/login` redirects to `/app/overview` and dashboard renders. Signup flow redirects to `/verify-email`.
- Testing subagent verified 13/13 acceptance criteria pass.

## Prioritized Backlog
- **P1**: Wire dashboard widgets to live data (currently use mockData for sparkles/leaderboard).
- **P1**: Complete onboarding step pages (Step1Agent / Step2Business / Step3Channels) → `/api/onboarding/complete` round-trip.
- **P2**: Production hardening — pin `CORS_ORIGINS` to allowed hosts (not `*`), re-enable credentials.
- **P2**: Add structured logging when DynamoDB upserts fail (currently silent).
- **P3**: Refactor `server.py` (290+ lines mixing agents/leads/onboarding) into `app/api/*` modules.
- **P3**: Update stale test assertion `test_cognito_auth.py::TestResend::test_resend_nonexistent_email_returns_404` (current anti-enumeration 200 is correct).

## Next Tasks
- Confirm with user whether to continue with dashboard data wiring, onboarding flow, or another area.

## Notes
- AWS keys live ONLY in `/app/backend/.env` (never committed).
- Cognito Hosted UI works for `localhost:3000` and the current preview URL; if the preview URL changes you must re-run the boto3 update to add the new callback / logout URLs.
