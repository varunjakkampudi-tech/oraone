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

### 2026-02 — Auth pages visual redesign (v2: channel orbit)
- Updated `/app/frontend/src/layouts/AuthLayout.jsx` left panel to a "channel orbit" scene matching the second reference:
  - Top: OraOne logo + tagline
  - Route-aware headline with blue→violet gradient on the accent line ("smarter conversations" for login, "unlock smarter AI" for signup)
  - **Center**: Glowing 3D OraOne pedestal card surrounded by 4 channel icons — **Live Chat (purple), WhatsApp (green, real glyph), Voice Calls (amber), Analytics (violet)** — connected to the central card by curved dashed gradient lines
  - Bottom: avatar trust strip + 4.9/5 rating
- Removed the previous "feature cards" list (functionality now visualised by the orbit scene).

## Still Pending
- Integrations page icons: previous agent's `cdn.simpleicons.org` slugs produced 404s for slack/webhooks/salesforce/microsoftoutlook/microsoftteams/pipedrive. User pivoted to auth pages; integration icons still need a fix (jsdelivr dashboard-icons CDN or inline SVGs).

### 2026-02 — Book Demo page redesign
- Rebuilt `/app/frontend/src/pages/marketing/Contact.jsx` (route `/contact`) to match the user-supplied reference.
- Left column: `BOOK A DEMO` pill, large hero heading, description, 3 Email/Phone/Office info cards, lavender-blue "Why book a demo?" benefits card with 3 checkmarks.
- Right column form: leading-icon Full Name + Email inputs, Phone Number with country code dropdown (10 countries, default 🇮🇳 +91), Company Size dropdown (6 size buckets), "How can we help you?" textarea, Preferred Demo Time `datetime-local` picker, Shield-icon security disclaimer, blue calendar-icon "Book a Demo" CTA, "Not sure yet? Learn more about OraOne" footer link.
- Extra fields (phone, company size, demo time) are bundled into the existing `/api/contact` message payload so the backend `ContactIn` schema is untouched. Verified via curl — `200 OK` with returned id.
- Data-testids: existing `contact-name`/`contact-email`/`contact-message`/`contact-submit` preserved; added `contact-phone`, `contact-country-code`, `contact-company-size`, `contact-demo-time`, `contact-learn-more`.
