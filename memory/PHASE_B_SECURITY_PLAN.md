# Phase B — Security Hardening Implementation Plan

> **Status:** PLANNING ONLY. Do not execute without explicit user approval.
> **Owner:** Main agent → must call `integration_playbook_expert_v2` BEFORE
> touching any auth code (Emergent rule).

---

## 1. Rate Limiting

**Goal:** Prevent brute-force on login/signup and abuse on API endpoints.

**Backend (FastAPI):**
- Add `slowapi` dependency (Redis-backed in prod, in-memory in dev).
- Apply per-route limits:
  - `/api/auth/login` → 5 req / 15 min / IP
  - `/api/auth/register` → 3 req / hour / IP
  - `/api/auth/forgot-password` → 3 req / hour / IP
  - `/api/*` (authenticated) → 100 req / min / user
- 429 response with `Retry-After` header.

**Frontend:** Show a friendly toast when 429 is received.

---

## 2. CSRF Protection

**Goal:** Block cross-site form submission attacks on state-changing endpoints.

**Approach:** Double-submit cookie pattern (works with httpOnly JWT setup):
- On login, issue `csrf-token` cookie (NOT httpOnly, SameSite=Lax).
- Frontend reads it from `document.cookie` and sends as `X-CSRF-Token` header.
- Backend middleware validates header == cookie for POST / PUT / PATCH / DELETE.
- GET/HEAD/OPTIONS exempt.

---

## 3. Input Sanitisation

**Backend:**
- Pydantic v2 models with `StringConstraints` (min/max length, regex).
- HTML strip on free-text fields using `bleach`.
- File-upload MIME-type sniffing via `python-magic` (not just extension).
- Block SSRF: server-side URL fetching uses an allow-list.

**Frontend:**
- Render user content with React (auto-escapes).
- Never set `dangerouslySetInnerHTML` from user input.

---

## 4. JWT Expiry & Refresh

**Current:** Check `/app/backend/auth.py` for current expiry.

**Target:**
- Access token: 15 min lifetime, signed `HS256` (rotate to `EdDSA` later).
- Refresh token: 7 day lifetime, single-use, stored hashed in DB.
- Auto-refresh on 401 — frontend interceptor.
- Refresh-token reuse detection → invalidate entire family.

---

## 5. Secure Cookies

```python
response.set_cookie(
    key="access_token",
    value=token,
    httponly=True,
    secure=True,       # HTTPS only
    samesite="lax",    # CSRF defence-in-depth
    max_age=900,
    path="/",
)
```

- Domain attribute set to `.oraone.ai` in production.
- Local dev uses `secure=False` and `domain=None`.

---

## 6. HTTPS-only

**Backend (FastAPI):**
- `app.add_middleware(HTTPSRedirectMiddleware)` in production.
- `app.add_middleware(TrustedHostMiddleware, allowed_hosts=["oraone.ai", "*.oraone.ai"])`.
- HSTS header: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.

**Frontend:**
- `<meta http-equiv="Content-Security-Policy" ...>` with:
  - `default-src 'self'`
  - `connect-src 'self' https://api.oraone.ai`
  - `img-src 'self' data: https://customer-assets.emergentagent.com`
  - `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com`

---

## 7. RBAC Review

**Current:** UI-only RBAC (Owner / Admin / Manager / Viewer) — backend enforcement missing on most routes.

**Target:**
- Add `@require_role("Admin")` decorator in FastAPI.
- Apply to:
  - `DELETE /api/agents/{id}` → Admin+
  - `POST /api/team/invite` → Admin+
  - `POST /api/integrations/connect` → Admin+
  - `GET /api/audit-logs` → Admin+
- Return 403 (not 401) when role check fails.

---

## 8. Additional Hardening

- **Password policy**: min 12 chars, 1 upper, 1 number, 1 symbol. Already partial — verify.
- **Bcrypt rounds**: `BCRYPT_ROUNDS=12` (production).
- **Account lockout**: 5 failed logins → 15 min lockout (Redis-backed).
- **Email verification**: existing — ensure required before agent creation.
- **2FA / TOTP**: TODO for Phase B.5 (post-launch).
- **Session listing & revoke**: `/api/auth/sessions` → list + revoke individual sessions.

---

## 9. Tests

- `test_rate_limiting.py` — assert 429 after limit
- `test_csrf.py` — assert state-changing POST without header is rejected
- `test_rbac.py` — viewer cannot delete agent
- `test_jwt.py` — expired token returns 401; refresh works; refresh reuse blocks family
- `test_secure_cookies.py` — login response has correct cookie attrs

---

## Estimated effort

- 2 days backend work (rate-limiting + CSRF + JWT refresh + RBAC enforcement)
- 1 day frontend integration (CSRF header, 401 interceptor with refresh, 429 toast)
- 1 day testing
- **Total: 4 working days**

---

## Pre-execution checklist (for the agent who picks this up)

1. ☐ Call `integration_playbook_expert_v2` for the current OraOne auth playbook.
2. ☐ Compare current `/app/backend/auth.py` against playbook recommendations.
3. ☐ Document any deviations before modifying auth code.
4. ☐ Take backup of `/app/backend/auth.py` and `/app/backend/db.py` before changes.
5. ☐ Run the full backend test suite before and after.
6. ☐ Update `/app/memory/test_credentials.md` if anything in seed/auth flow changes.

---

*Document generated: Feb 12, 2026 · Phase B owner: Main agent (next iteration)*
