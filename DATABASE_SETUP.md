# OraOne — Database Setup (Postgres + Alembic)

The OraOne backend uses **AWS RDS PostgreSQL** as its primary data store
for tenant-scoped business data (users, orgs, agents, conversations, etc.).
Schema is managed by **Alembic** migrations checked into `backend/alembic/`.

> The legacy `MongoDB` connection is still used for transient `agents`/`leads`
> demo collections and will be migrated over in a follow-up task.

---

## 1) Connection details

Set these in `backend/.env` (already wired from `backend/.env.local.example`):

```env
DB_HOST=oraone-postgres.c38080q04ynb.ap-south-2.rds.amazonaws.com
DB_PORT=5432
DB_NAME=oraone
DB_USER=oraone_admin
DB_PASSWORD=...

# Composed automatically by app code; set explicitly here for clarity:
DATABASE_URL=postgresql+asyncpg://oraone_admin:...@<host>:5432/oraone
ALEMBIC_DATABASE_URL=postgresql+psycopg2://oraone_admin:...@<host>:5432/oraone
```

⚠️ **Network reachability**: the RDS instance resolves to a **private VPC IP**
(`10.0.130.156`). It is not reachable from arbitrary internet egress — including
the Emergent preview pod. To run migrations or seed data you need one of:

- A laptop on the VPC's VPN
- An EC2 / Cloud9 instance inside the same VPC
- A bastion + `ssh -L 5432:<rds-endpoint>:5432 ...` tunnel
- Or temporarily flip the RDS instance to **Publicly accessible = Yes** in
  the AWS console and whitelist your IP in its security group.

The backend boots cleanly even when Postgres is unreachable; the engine
initialises lazily and only the routes that need the DB will error out
(visible via `GET /api/db/health` which returns `503 db_unreachable: ...`).

---

## 2) Run the initial migration

From any machine with VPC access to RDS:

```bash
cd backend
source .venv/bin/activate
pip install -r requirements.txt

# Sanity check — generates SQL without connecting:
alembic upgrade head --sql > /tmp/oraone_initial.sql
less /tmp/oraone_initial.sql

# Apply against RDS:
alembic upgrade head
```

You should see:

```
INFO  [alembic.runtime.migration] Running upgrade  -> 0001_initial
```

Verify via the running backend:

```bash
curl https://<your-host>/api/db/health
# → {"ok": true, "version": "PostgreSQL 16.x ...", "tables": [...8 tables...]}
```

---

## 3) Schema (Phase 1)

| Table                  | Purpose                                                                |
|------------------------|------------------------------------------------------------------------|
| `users`                | System-of-record identity. 1:1 with Cognito (`cognito_sub` unique).    |
| `organizations`        | Multi-tenant boundary. Every domain row is scoped by `org_id`.         |
| `organization_members` | Many-to-many user↔org with role (`owner`/`admin`/`member`/`viewer`).   |
| `agents`               | AI workers (voice / chat / whatsapp) owned by an organization.         |
| `agent_configs`        | 1:1 typed config (model, voice, system prompt) + JSONB `extra` blob.   |
| `conversations`        | One customer↔agent thread; status enum + recording/transcript URLs.    |
| `messages`             | Single utterance inside a conversation (`agent`/`customer`/…).         |
| `integrations`         | 3rd-party connections per org (Twilio, SendGrid, Meta WA, CRM, …).     |

11 enum types are created up-front; see `alembic/versions/*_0001_initial.py`
for the source of truth.

---

## 4) Creating new migrations

```bash
# Edit a model under backend/app/db/models/ then:
cd backend
alembic revision --autogenerate -m "add foo column"
# Review the generated file, edit if needed, then:
alembic upgrade head
```

Conventions:
- One migration per logical change. Keep them small + reversible.
- For Postgres `ENUM` types, use `op.execute("CREATE TYPE ...")` rather than
  letting SQLAlchemy emit it inline (see the initial migration as reference).
- Always provide a `downgrade()` even if it just drops a column.

---

## 5) Daily dev loop

```bash
# Start the engine + check
curl http://localhost:8000/api/db/health

# Open a psql shell
psql "$DATABASE_URL"

# Roll back the last migration
alembic downgrade -1

# Re-apply
alembic upgrade head

# See what's pending vs the DB
alembic history --verbose
alembic current
```

---

## 6) Troubleshooting

| Symptom | Fix |
|---|---|
| `connection timed out` to RDS | You're not on the VPC. See §1 reachability options. |
| `relation "users" already exists` on first migration | RDS already had a hand-rolled schema. Either drop the conflicting tables or stamp the current state with `alembic stamp 0001_initial` first. |
| `psycopg2.OperationalError: SSL connection has been closed` | Add `?sslmode=require` to `ALEMBIC_DATABASE_URL`. |
| Backend boots but `/api/db/health` is 503 | Expected if RDS unreachable — services that don't need the DB still work. Whitelist the egress IP or move into the VPC. |
| Cognito login still uses DynamoDB upsert | That's intentional for now — Phase 2 will switch the user-upsert to Postgres. |

---

## 7) Phase 2 (TODO — not in this PR)

- Switch the Cognito post-login user-upsert from DynamoDB → Postgres `users`.
- Auto-create a personal `organization` + `organization_members` row on first login.
- Migrate `MongoDB.agents` and `MongoDB.leads` to `agents` + `conversations`.
- Add `RLS` (Row-Level Security) policies enforcing `org_id = current_setting('app.org_id')`.
