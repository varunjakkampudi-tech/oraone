# OraOne — Status

## Original problem statement
Pull `https://github.com/varunjakkampudi-tech/oraone.git`, wire to AWS
(Cognito + DynamoDB + RDS Postgres), provide env for production + local.
Audit Phase 0 (infra), Phase 1 (auth), Phase 2 (Postgres) and make sure
the app runs anywhere without breaking after `git pull && run`.

## What's been implemented & verified

### Phase 0 (Infrastructure) — confirmed on user side
✅ AWS account, IAM, S3, Cognito (pool + client + Hosted UI), DynamoDB,
   custom VPC + subnets + IGW + S3 VPC endpoint, RDS PostgreSQL,
   security groups, EC2 with backend deployed.

### Phase 1 (Authentication) — 14/14 PASS (preview + localhost) — 2026-06-22
- POST /api/auth/signup (Cognito user create + code delivery + weak-password reject)
- POST /api/auth/verify (admin-confirm equivalent works end-to-end)
- POST /api/auth/login (access + id + refresh tokens, blocks unverified, rejects wrong pwd)
- GET  /api/auth/me (JWKS-validated, returns DynamoDB profile)
- POST /api/auth/refresh (returns rotated access token)
- POST /api/auth/logout (Cognito global sign-out)
- DynamoDB user upsert (userId/email/createdAt/lastLogin) on every login
- Fail-fast config: missing env vars raise at import (no silent AWS account swap)
- `tests/audit_phase1_auth.py` (re-runnable, env-portable via `API_BASE_URL=...`)

### Phase 2 (PostgreSQL Foundation) — 9/9 PASS — 2026-06-22
- Async SQLAlchemy + asyncpg, lazy engine, idempotent init_engine()
- Session factory (`AsyncSessionLocal`, `get_db` dependency)
- Repository pattern (BaseRepository[ModelT] + per-aggregate repos)
- Alembic configured to read DATABASE_URL / ALEMBIC_DATABASE_URL / DB_*
- All 3 migrations apply cleanly against a fresh Postgres 15
- `alembic_version` at head: `0003_doc_processing_telemetry`
- 12 tables created and match Base.metadata exactly (no drift)
- GET /api/health → 200, GET /api/health/db → 200 against local PG
- `tests/audit_phase2_postgres.py` (run with `OVERRIDE_DATABASE_URL=...`)

### Bugs found & fixed
1. **`config.py` had hardcoded AWS fallbacks** → rewrote with `_required()`
   helper so missing env raises at import time. No more silent talk-to-the-
   wrong-account in production.
2. **Migration `0003_document_processing_telemetry` had a 35-char revision id
   but `alembic_version.version_num` is `VARCHAR(32)`** → would crash any
   fresh deploy. Renamed to `0003_doc_processing_telemetry` (29 chars).
3. **Missing runtime deps** (`Mako`, `greenlet`) added to requirements.txt.
4. **`pytest` couldn't load `.env`** (broke after fail-fast config) →
   added `backend/conftest.py` that loads `.env` before any app import.
5. **`pytest.ini` for test discovery** → tests now run without
   `export PYTHONPATH=$(pwd)`.

### Env files (six total)
- `backend/.env` ............... live values (current preview)
- `backend/.env.local.example` . local dev defaults to LOCAL Postgres
- `backend/.env.production.example` for EC2 inside the RDS VPC
- `frontend/.env` .............. live values (current preview)
- `frontend/.env.local.example`. localhost
- `frontend/.env.production.example` production CDN

## What the user still needs to do (only they can)
1. **AWS Cognito App Client → Allowed Callback URLs**: add
   `https://9ac7729c-...preview.emergentagent.com/auth/callback`,
   `http://localhost:3000/auth/callback`, and any EC2/prod domain.
2. **EC2 deploy** (one-time, on EC2 inside the RDS VPC):
   ```
   git pull
   cd backend && pip install -r requirements.txt
   alembic upgrade head
   sudo systemctl restart oraone-backend   # or supervisor
   ```
3. **Rotate secrets** (`AKIA5YU64BPEUQND2BBE` + RDS password) shared in chat.
4. RDS in private VPC is unreachable from Emergent preview pod — by design.
   `/api/health/db` will show "TimeoutError" here; works perfectly from EC2.

## Re-running the audits
```bash
# Phase 1 — Cognito + DynamoDB
cd /app/backend
python tests/audit_phase1_auth.py                      # preview
API_BASE_URL=http://127.0.0.1:8001 python tests/audit_phase1_auth.py   # local

# Phase 2 — Postgres (against local PG)
OVERRIDE_DATABASE_URL="postgresql+asyncpg://oraone_local:oraone_local@localhost:5432/oraone_local" \
OVERRIDE_ALEMBIC_DATABASE_URL="postgresql+psycopg2://oraone_local:oraone_local@localhost:5432/oraone_local" \
python tests/audit_phase2_postgres.py
```

## Backlog
- Phase 3+ audits as user requests them
- Optional: drop the legacy MongoDB-backed `agents`/`leads` once Phase 6 routes are
  used end-to-end (currently both Mongo and Postgres versions are mounted).
