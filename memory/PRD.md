# OraOne V1 — Product Requirements Document

**Tagline:** One AI. Every Conversation.

## Problem Statement
Build OraOne V1: an AI Agent Platform (Voice, Chat, WhatsApp) that helps businesses automate customer conversations across channels. Premium SaaS quality similar to Haptik, Intercom, HubSpot, Retell AI, Bland AI, ElevenLabs.

## Tech Stack (Final)
- **Frontend:** React 19 + React Router 7 + Tailwind + Shadcn/UI + Framer Motion + Recharts + Lucide React
- **Backend:** FastAPI + Motor (async MongoDB) + JWT (httpOnly cookies) + bcrypt
- **Database:** MongoDB (Mongo-compatible; designed to plug into AWS Aurora PostgreSQL via Prisma later)
- **Auth:** Email/Password JWT (refresh tokens). Google + Microsoft buttons present (marked "Coming Soon")

## User Personas
1. **Owner / Founder** — Sets up the AI agents, manages billing, invites team.
2. **Admin / Operations** — Configures agents, knowledge base, integrations.
3. **Manager / Sales** — Reviews conversations, manages leads.
4. **Viewer** — Read-only access to analytics.

## Core Requirements (Static)
1. Full marketing website (10 pages) + legal (4 pages) + 404
2. Auth flow: Login, Signup, Verify Email, Forgot Password, Reset Password
3. Onboarding: 3-step wizard (Agent → Business Info → Channels)
4. Dashboard with 9 modules: Overview, Agents, Conversations, Leads, Analytics, Knowledge Base, Integrations, Team, Settings
5. Agent CRUD for Voice / Chat / WhatsApp with multi-tab builder
6. Live conversation viewer (mock transcripts)
7. Lead table with CSV export
8. Recharts analytics
9. Role-based UI (Owner/Admin/Manager/Viewer)
10. Responsive on mobile/tablet/desktop
11. SEO meta tags, sitemap.xml, robots.txt

## What's Been Implemented (Feb 2026)
### Backend (`/app/backend/server.py`)
- Auth endpoints: `/api/auth/{register,login,logout,me,refresh,forgot-password,reset-password}`
- Onboarding completion endpoint
- Agents CRUD (`/api/agents`)
- Leads CRUD (`/api/leads`)
- Contact & newsletter capture
- Dashboard overview metrics
- Admin seed on startup (`admin@oraone.ai` / `OraOne@2026`)
- Mongo indexes (unique email, user-scoped agents/leads)

### Frontend
- 27+ screens delivered:
  - Marketing: Home, Products, Solutions, Integrations, Templates, Pricing, Documentation, Case Studies, About, Contact
  - Legal: Privacy, Terms, Cookie, Data Deletion, 404
  - Auth: Login, Signup, Verify Email, Forgot Password, Reset Password
  - Onboarding: 3 steps
  - Dashboard: Overview, Agents list, Create Agent, Agent Builder, Conversations, Leads, Analytics, Knowledge Base, Integrations, Team, Settings
- Premium design system: Inter font, white theme with strategic dark accents, blue gradients, soft shadows, rounded-2xl cards
- Framer Motion entrance animations, staggered reveals, hover lifts
- Recharts for line charts, bar charts, and donut/pie
- SEO meta tags via `useSEO()` hook on every page
- Sitemap.xml + robots.txt
- Analytics placeholders (GA4, GTM, Microsoft Clarity, PostHog) in `public/index.html` — uncomment to enable

## Mocked / Deferred Features (MOCKED)
- Google / Microsoft social login — buttons display but show "Coming Soon" toast (no Cognito)
- Conversation streaming — uses mock transcript data
- Knowledge base upload — toast informs user S3 connection is required
- AI agent inference — no LLM calls yet (designed to plug in later)
- Email sending (Verify Email, Password Reset) — token is logged to backend console only (no SES yet)
- MFA — UI states present, no actual flow
- Audit logs — display mock entries

## P0/P1/P2 Backlog
### P0 (next)
- Wire Emergent Google Auth into Login/Signup
- Real S3 (or Emergent object storage) for Knowledge Base PDF uploads
- Real-time WebSocket for live conversations

### P1
- AI inference plug-in layer (OpenAI / Anthropic / Gemini via Emergent LLM key)
- Send password reset emails (Resend / SendGrid / AWS SES)
- Stripe billing once leaving Beta

### P2
- Email Agent, SMS Agent, Instagram Agent (architecture already supports it)
- AI Scheduler / Receptionist / Sales agents
- Multi-workspace support
- AWS Cognito SSO

## Test Credentials
See `/app/memory/test_credentials.md`


## Recent Changes

### 2026-02 — Auth pages visual redesign
- Rebuilt `/app/frontend/src/layouts/AuthLayout.jsx`, `Login.jsx`, `Signup.jsx` to match user-supplied reference mocks.
- Left panel: dark cosmic theme with OraOne brand mark (top), route-aware gradient headline (white + violet), 3 feature cards (signup only — All-in-one AI Platform, Built for Teams, Secure & Reliable), 3D pedestal showcasing the OraOne icon, floating accent chips, trust strip with avatars and 4.9/5 rating.
- Right panel (signup): "14-day free trial" pill, Google + Phone social buttons (side-by-side), 2-column Name/Email row, Password + Confirm Password with eye toggles, lavender "Your data is safe with us" trust card with lock illustration, Terms checkbox, purple gradient `Create Account` CTA.
- Right panel (login): Welcome back heading, Google + Phone buttons, Email + Password with Forgot link and eye toggle, Remember me, purple gradient `Log In` CTA, trust card, demo creds footer.
- "use our logo only": both header brand and 3D pedestal now render the official OraOne `BRAND_MARK_URL`.
- All existing data-testids preserved (loginGoogle, loginMicrosoft, loginEmail, loginPassword, loginSubmit, signupGoogle/Microsoft/FullName/Email/Password/Submit). `loginMicrosoft` / `signupMicrosoft` now wired to the "Continue with Phone" button.

## Still Pending
- Integrations page icons: previous agent's `cdn.simpleicons.org` slugs produced 404s for slack/webhooks/salesforce/microsoftoutlook/microsoftteams/pipedrive. User pivoted to auth pages; integration icons still need a fix (jsdelivr dashboard-icons CDN or inline SVGs).
