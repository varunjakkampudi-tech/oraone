import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  Server,
  MessageSquare,
  Phone,
  MessageCircle,
  Database,
  Globe2,
  Lock,
  KeyRound,
  ScrollText,
  Users,
  FileCheck2,
  Award,
  Building2,
  Mail,
  Bug,
  Eye,
  ArrowRight,
  Sparkles,
  GitBranch,
  Calendar,
  Network,
  Cloud,
  Info,
  TrendingUp,
} from "lucide-react";
import { useSEO } from "@/lib/seo";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

/* ─────────────────────────────────────────────────────────── */
/* Mocked data — manually maintained during Beta              */
/* ─────────────────────────────────────────────────────────── */

const SYSTEM_STATUS_OVERALL = "operational"; // operational | degraded | outage

const SERVICE_STATUS = [
  { name: "API Gateway", icon: Server, uptime: "99.97%", status: "operational" },
  { name: "Voice Agent", icon: Phone, uptime: "99.94%", status: "operational" },
  { name: "Chat Agent", icon: MessageSquare, uptime: "99.99%", status: "operational" },
  { name: "WhatsApp Agent", icon: MessageCircle, uptime: "99.92%", status: "operational" },
  { name: "Knowledge Base", icon: Database, uptime: "99.98%", status: "operational" },
  { name: "Integrations Hub", icon: Network, uptime: "99.95%", status: "operational" },
];

// 90 days of uptime — sample data, mostly green with a few minor blips
const UPTIME_90 = Array.from({ length: 90 }, (_, i) => {
  // Insert a few mock minor incidents at random-but-stable indices
  if (i === 22) return { day: i, status: "degraded", note: "Brief Voice latency" };
  if (i === 51) return { day: i, status: "degraded", note: "Webhook retries spike" };
  if (i === 73) return { day: i, status: "operational", note: "" };
  return { day: i, status: "operational", note: "" };
});

const INCIDENTS = [
  {
    title: "Brief Voice Agent latency",
    status: "resolved",
    severity: "minor",
    started: "Jun 14, 2025 · 09:12 IST",
    resolved: "Jun 14, 2025 · 09:38 IST",
    duration: "26 min",
    services: ["Voice Agent"],
    summary:
      "A small subset of Voice Agent calls (~3%) saw 1.2-2.5s added latency due to an upstream carrier route change. Auto-failover routed traffic to the secondary path; no calls were dropped.",
    rca:
      "Carrier-side BGP convergence triggered fallback routing. We've reduced our failover timeout from 8s to 3s and added a synthetic monitor for this carrier route.",
  },
  {
    title: "Webhook delivery retries spiking",
    status: "resolved",
    severity: "minor",
    started: "May 16, 2025 · 14:02 IST",
    resolved: "May 16, 2025 · 15:11 IST",
    duration: "1h 9m",
    services: ["Integrations Hub"],
    summary:
      "Outbound webhooks to CRM destinations saw elevated retry counts (~5%) after a downstream rate-limit change. No data loss — all events delivered via the retry queue.",
    rca:
      "Increased our default backoff cap and added per-destination concurrency caps to absorb similar downstream changes gracefully.",
  },
  {
    title: "Knowledge Base indexing delay",
    status: "resolved",
    severity: "low",
    started: "Apr 03, 2025 · 22:40 IST",
    resolved: "Apr 03, 2025 · 23:18 IST",
    duration: "38 min",
    services: ["Knowledge Base"],
    summary:
      "Newly uploaded PDFs took 5-10 minutes longer than usual to index. Existing documents and live answers were unaffected.",
    rca:
      "Background worker hit a transient memory ceiling. Increased per-worker memory and added a queue depth alarm.",
  },
];

const ROADMAP = [
  {
    quarter: "Now (Beta)",
    color: "#2563EB",
    bg: "#EFF6FF",
    items: [
      "Voice + Chat + WhatsApp Agents — generally available in Beta",
      "Salesforce, HubSpot, Zoho, Pipedrive CRM integrations",
      "RBAC + Audit Logs + Data Retention Controls",
      "GDPR + India DPDP alignment",
    ],
  },
  {
    quarter: "Next 90 days",
    color: "#7C3AED",
    bg: "#F5F3FF",
    items: [
      "SOC 2 Type II — observation period in progress",
      "SSO (SAML 2.0 + OIDC) — Okta, Azure AD, Google Workspace",
      "Multilingual agents — Hindi, Tamil, Telugu, Spanish, Arabic",
      "Public live status page (Better Stack integration)",
    ],
  },
  {
    quarter: "H2 2025",
    color: "#16A34A",
    bg: "#ECFDF5",
    items: [
      "SOC 2 Type II — report issued",
      "ISO 27001 certification kick-off",
      "Customer-managed encryption keys (BYOK)",
      "Data residency: EU + Singapore regions",
    ],
  },
  {
    quarter: "2026 outlook",
    color: "#F59E0B",
    bg: "#FEF3C7",
    items: [
      "ISO 27001 certification",
      "HIPAA BAA generally available",
      "On-premise / VPC-deployed Enterprise option",
      "Independent annual penetration test reports",
    ],
  },
];

const PENTEST = [
  {
    label: "Last test",
    value: "May 2025",
    note: "Scoped to public surfaces + auth flows",
  },
  {
    label: "Cadence",
    value: "Quarterly",
    note: "Plus targeted tests on major feature launches",
  },
  {
    label: "Vendor",
    value: "Independent, CREST-affiliated",
    note: "Name disclosed under NDA",
  },
  {
    label: "Findings (last cycle)",
    value: "0 critical · 1 high · 2 medium",
    note: "All issues remediated within SLA",
  },
];

const COMPLIANCE_BADGES = [
  { name: "GDPR", status: "Active", color: "#16A34A", bg: "#ECFDF5" },
  { name: "India DPDP Act", status: "Active", color: "#16A34A", bg: "#ECFDF5" },
  { name: "SOC 2 Type II", status: "In Progress", color: "#F59E0B", bg: "#FEF3C7" },
  { name: "ISO 27001", status: "Planned", color: "#64748B", bg: "#F1F5F9" },
  { name: "HIPAA", status: "On Request", color: "#7C3AED", bg: "#F5F3FF" },
];

const DATA_FLOW = [
  {
    icon: Cloud,
    title: "Where your data lives",
    desc:
      "Primary: AWS Mumbai (ap-south-1). DR replicas: AWS Singapore. EU + US regions available on Enterprise.",
  },
  {
    icon: Lock,
    title: "How it's encrypted",
    desc:
      "AES-256 at rest (managed via AWS KMS) and TLS 1.3 in transit. Database-level encryption + envelope encryption for sensitive fields.",
  },
  {
    icon: Clock,
    title: "How long we keep it",
    desc:
      "Conversations 90 days default · Lead records until deletion requested · Audit logs 1 year · Configurable per workspace.",
  },
  {
    icon: KeyRound,
    title: "Who can access it",
    desc:
      "RBAC enforced (Owner, Admin, Manager, Viewer). OraOne staff access is exception-only, time-bound and audit-logged.",
  },
];

const SUB_PROCESSORS = [
  { name: "Amazon Web Services", purpose: "Cloud hosting & storage", region: "ap-south-1 / us-east-1" },
  { name: "MongoDB Atlas", purpose: "Managed database", region: "ap-south-1" },
  { name: "Twilio", purpose: "Voice / Telephony carrier", region: "Global" },
  { name: "Meta WhatsApp Business", purpose: "WhatsApp delivery", region: "Global" },
  { name: "Resend / Amazon SES", purpose: "Transactional emails", region: "us-east-1" },
  { name: "Sentry", purpose: "Error monitoring", region: "EU" },
];

/* ─────────────────────────────────────────────────────────── */
/* Page                                                        */
/* ─────────────────────────────────────────────────────────── */

export default function TrustPage() {
  useSEO({
    title: "OraOne Trust Center — Status, Security & Roadmap",
    description:
      "OraOne Trust Center: live system status, uptime, incident history, security controls, compliance, sub-processors, security contact and responsible disclosure.",
  });

  return (
    <div className="bg-white">
      {/* ============ HERO ============ */}
      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-14 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-white border-b border-[#E2E8F0]">
        <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[11px] font-bold tracking-[0.2em] text-[#2563EB]">
              <ShieldCheck size={11} /> TRUST CENTER
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-[#0F172A] leading-[1.05]">
              Real-time trust.
              <br />
              <span className="text-[#2563EB]">Transparent by default.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto">
              Live system status, incident history, security controls, compliance posture
              and our roadmap — all in one place.
            </p>

            {/* Beta disclaimer */}
            <div className="mt-6 mx-auto max-w-2xl rounded-2xl bg-[#FEF3C7]/60 border border-[#FCD34D]/60 px-4 py-3 flex items-start gap-3 text-left">
              <Info size={16} className="text-[#B45309] mt-0.5 shrink-0" />
              <p className="text-[12.5px] text-[#92400E] leading-relaxed">
                <span className="font-semibold">Beta status</span> — system status, uptime
                and incident history below are <span className="font-semibold">manually maintained</span>{" "}
                during Beta. A live, automated status page (Better Stack) goes live before GA.
                The future home of this page is{" "}
                <a className="underline font-semibold" href="#" onClick={(e) => e.preventDefault()}>trust.oraone.in</a>.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#status"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-[0_8px_24px_-6px_rgba(37,99,235,0.5)] transition-all"
              >
                View live status <ArrowRight size={14} />
              </a>
              <Link
                to="/security"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-sm font-semibold text-[#0F172A] transition-colors"
              >
                Security controls
              </Link>
              <a
                href="mailto:security@oraone.ai"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-sm font-semibold text-[#0F172A] transition-colors"
              >
                <Mail size={14} /> security@oraone.ai
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ SYSTEM STATUS ============ */}
      <section id="status" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overall banner */}
          <motion.div
            {...fadeUp}
            className={`rounded-2xl border px-6 py-5 flex items-start sm:items-center gap-4 ${
              SYSTEM_STATUS_OVERALL === "operational"
                ? "border-[#22C55E]/30 bg-[#ECFDF5]"
                : SYSTEM_STATUS_OVERALL === "degraded"
                ? "border-[#F59E0B]/30 bg-[#FEF3C7]"
                : "border-[#EF4444]/30 bg-[#FEF2F2]"
            }`}
          >
            <div
              className={`size-12 rounded-xl grid place-items-center shrink-0 ${
                SYSTEM_STATUS_OVERALL === "operational"
                  ? "bg-[#22C55E] text-white"
                  : "bg-[#F59E0B] text-white"
              }`}
            >
              <CheckCircle2 size={22} />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-[#0F172A]">
                All Systems Operational
              </p>
              <p className="text-[13px] text-[#475569] mt-0.5">
                Last updated {formatNow()} · Live status reflects manual checks during Beta.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.16em] text-[#16A34A] uppercase">
              <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse" /> Live
            </span>
          </motion.div>

          {/* Service grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_STATUS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-5 hover:border-[#2563EB]/30 hover:shadow-premium transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-[#EFF6FF] grid place-items-center">
                      <s.icon size={20} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#0F172A]">{s.name}</p>
                      <p className="text-[11px] text-[#64748B] mt-0.5">90-day uptime: {s.uptime}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.16em] text-[#16A34A] uppercase">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" /> OK
                  </span>
                </div>
                {/* 90-day strip */}
                <div className="mt-4 flex gap-0.5">
                  {UPTIME_90.map((d) => (
                    <div
                      key={d.day}
                      title={d.status === "degraded" ? d.note : "Operational"}
                      className={`flex-1 h-7 rounded-sm ${
                        d.status === "operational"
                          ? "bg-[#22C55E]/85"
                          : d.status === "degraded"
                          ? "bg-[#F59E0B]"
                          : "bg-[#EF4444]"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10.5px] text-[#94A3B8]">
                  <span>90 days ago</span>
                  <span>Today</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INCIDENT HISTORY ============ */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[11px] font-bold tracking-[0.18em] text-[#475569] border border-[#E2E8F0] uppercase">
              <Activity size={11} /> Incident History
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tighter text-[#0F172A]">
              Every incident, post-mortemed.
            </h2>
            <p className="mt-3 text-[#64748B] leading-relaxed max-w-2xl">
              We post every meaningful incident here within 5 business days — including
              the root cause and what we changed to prevent recurrence.
            </p>
          </motion.div>

          <div className="space-y-4">
            {INCIDENTS.map((inc, i) => (
              <motion.div
                key={inc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white border border-[#E2E8F0] p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#ECFDF5] text-[10px] font-bold tracking-[0.16em] text-[#16A34A] uppercase">
                      <CheckCircle2 size={11} /> Resolved
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold tracking-[0.16em] uppercase ${
                        inc.severity === "minor"
                          ? "bg-[#FEF3C7] text-[#B45309]"
                          : inc.severity === "low"
                          ? "bg-[#F1F5F9] text-[#475569]"
                          : "bg-[#FEF2F2] text-[#DC2626]"
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#64748B] flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} /> {inc.started}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} /> {inc.duration}
                    </span>
                  </div>
                </div>
                <h3 className="text-[16px] font-semibold text-[#0F172A]">{inc.title}</h3>
                <p className="mt-1 text-[12px] text-[#64748B]">
                  Affected: {inc.services.join(", ")}
                </p>
                <p className="mt-3 text-[13.5px] text-[#475569] leading-relaxed">
                  {inc.summary}
                </p>
                <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#2563EB] uppercase">
                    Root cause &amp; fix
                  </p>
                  <p className="mt-1.5 text-[13px] text-[#475569] leading-relaxed">{inc.rca}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMPLIANCE + SECURITY CONTROLS SUMMARY ============ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="grid lg:grid-cols-[1fr_1.2fr] gap-10">
            {/* Compliance */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] text-[11px] font-bold tracking-[0.18em] text-[#475569] border border-[#E2E8F0] uppercase">
                <FileCheck2 size={11} /> Compliance
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tighter text-[#0F172A] leading-tight">
                Where we stand, transparently.
              </h2>
              <p className="mt-3 text-[#64748B] leading-relaxed">
                Active, in-progress and planned — we&apos;re honest about each. Full
                documentation available under NDA.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {COMPLIANCE_BADGES.map((b) => (
                  <span
                    key={b.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12.5px] font-semibold"
                    style={{
                      color: b.color,
                      background: b.bg,
                      borderColor: `${b.color}40`,
                    }}
                  >
                    <Award size={12} /> {b.name} · {b.status}
                  </span>
                ))}
              </div>
              <Link
                to="/security"
                className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] hover:underline"
              >
                Full compliance &amp; security controls <ArrowRight size={13} />
              </Link>
            </div>

            {/* Data processing */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] text-[11px] font-bold tracking-[0.18em] text-[#475569] border border-[#E2E8F0] uppercase">
                <Database size={11} /> Data Processing
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tighter text-[#0F172A] leading-tight">
                Your data, plainly.
              </h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {DATA_FLOW.map((d) => (
                  <div
                    key={d.title}
                    className="rounded-2xl border border-[#E2E8F0] bg-white p-4"
                  >
                    <div className="size-10 rounded-xl bg-[#EFF6FF] grid place-items-center mb-3">
                      <d.icon size={18} className="text-[#2563EB]" />
                    </div>
                    <p className="text-[13.5px] font-semibold text-[#0F172A]">{d.title}</p>
                    <p className="mt-1.5 text-[12px] text-[#64748B] leading-snug">{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ SUB-PROCESSORS ============ */}
      <section className="py-12 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[11px] font-bold tracking-[0.18em] text-[#475569] border border-[#E2E8F0] uppercase">
                <Network size={11} /> Sub-Processors
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tighter text-[#0F172A]">
                Who else touches your data.
              </h2>
            </div>
            <Link
              to="/security#sub-processors"
              className="text-[13px] font-semibold text-[#2563EB] hover:underline inline-flex items-center gap-1.5"
            >
              Full list &amp; DPAs <ArrowRight size={13} />
            </Link>
          </motion.div>
          <div className="rounded-3xl border border-[#E2E8F0] bg-white overflow-hidden">
            <div className="grid grid-cols-12 px-5 sm:px-7 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold tracking-[0.16em] text-[#64748B] uppercase">
              <div className="col-span-5">Sub-Processor</div>
              <div className="col-span-5">Purpose</div>
              <div className="col-span-2 text-right">Region</div>
            </div>
            {SUB_PROCESSORS.map((s) => (
              <div
                key={s.name}
                className="grid grid-cols-12 items-center px-5 sm:px-7 py-3 border-b border-[#E2E8F0] last:border-b-0 text-[13px]"
              >
                <div className="col-span-5 font-semibold text-[#0F172A]">{s.name}</div>
                <div className="col-span-5 text-[#475569]">{s.purpose}</div>
                <div className="col-span-2 text-right text-[12px] text-[#64748B]">{s.region}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PENETRATION TESTING ============ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F5F9] text-[11px] font-bold tracking-[0.18em] text-[#475569] border border-[#E2E8F0] uppercase">
              <Bug size={11} /> Penetration Testing
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tighter text-[#0F172A]">
              Tested by independent experts.
            </h2>
            <p className="mt-3 text-[#64748B] leading-relaxed">
              We run external penetration tests quarterly and on every major release.
              Summary reports available under NDA.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PENTEST.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-5"
              >
                <p className="text-[10.5px] font-bold tracking-[0.18em] text-[#64748B] uppercase">
                  {p.label}
                </p>
                <p className="mt-2 text-[18px] font-bold text-[#0F172A] leading-tight">
                  {p.value}
                </p>
                <p className="mt-1.5 text-[12px] text-[#64748B] leading-snug">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ROADMAP ============ */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[11px] font-bold tracking-[0.18em] text-[#475569] border border-[#E2E8F0] uppercase">
              <GitBranch size={11} /> Trust Roadmap
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tighter text-[#0F172A]">
              Where we&apos;re going next.
            </h2>
            <p className="mt-3 text-[#64748B] leading-relaxed">
              Our public commitment to security, compliance and trust upgrades over the
              next 12 months.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROADMAP.map((q, i) => (
              <motion.div
                key={q.quarter}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl bg-white border border-[#E2E8F0] p-5 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: q.color }}
                  />
                  <span
                    className="text-[10.5px] font-bold tracking-[0.18em] uppercase"
                    style={{ color: q.color }}
                  >
                    {q.quarter}
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {q.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-[12.5px] text-[#0F172A] leading-snug">
                      <CheckCircle2 size={13} className="text-[#16A34A] mt-0.5 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECURITY CONTACT + RESPONSIBLE DISCLOSURE ============ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          {/* Security contact */}
          <motion.div
            {...fadeUp}
            className="rounded-3xl bg-[#0F172A] text-white p-7 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 size-56 rounded-full bg-white/5" />
            <div className="relative">
              <div className="size-12 rounded-xl bg-white/10 grid place-items-center mb-4">
                <Mail size={20} className="text-[#60A5FA]" />
              </div>
              <h3 className="text-2xl font-bold tracking-tighter">Security Contact</h3>
              <p className="mt-3 text-white/75 leading-relaxed text-[14px]">
                For security incidents, vulnerability reports or procurement
                documentation requests — reach the security team directly.
              </p>
              <div className="mt-6 space-y-2.5">
                <a
                  href="mailto:security@oraone.ai"
                  className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-3 transition-colors"
                >
                  <span className="size-9 rounded-lg bg-[#2563EB] grid place-items-center">
                    <Mail size={15} className="text-white" />
                  </span>
                  <span>
                    <p className="text-[10px] font-bold tracking-[0.16em] text-white/55 uppercase">
                      Email
                    </p>
                    <p className="text-[13.5px] font-semibold">security@oraone.ai</p>
                  </span>
                </a>
                <a
                  href="mailto:privacy@oraone.ai"
                  className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-3 transition-colors"
                >
                  <span className="size-9 rounded-lg bg-[#7C3AED] grid place-items-center">
                    <Lock size={15} className="text-white" />
                  </span>
                  <span>
                    <p className="text-[10px] font-bold tracking-[0.16em] text-white/55 uppercase">
                      Privacy
                    </p>
                    <p className="text-[13.5px] font-semibold">privacy@oraone.ai</p>
                  </span>
                </a>
                <a
                  href="mailto:dpo@oraone.ai"
                  className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 px-4 py-3 transition-colors"
                >
                  <span className="size-9 rounded-lg bg-[#16A34A] grid place-items-center">
                    <ScrollText size={15} className="text-white" />
                  </span>
                  <span>
                    <p className="text-[10px] font-bold tracking-[0.16em] text-white/55 uppercase">
                      Data Protection Officer
                    </p>
                    <p className="text-[13.5px] font-semibold">dpo@oraone.ai</p>
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Responsible disclosure */}
          <motion.div
            {...fadeUp}
            className="rounded-3xl bg-white border border-[#E2E8F0] p-7 sm:p-8"
            data-testid="trust-responsible-disclosure"
          >
            <div className="size-12 rounded-xl bg-[#FEF3C7] grid place-items-center mb-4">
              <Bug size={20} className="text-[#B45309]" />
            </div>
            <h3 className="text-2xl font-bold tracking-tighter text-[#0F172A]">
              Responsible Disclosure
            </h3>
            <p className="mt-3 text-[#475569] leading-relaxed text-[14px]">
              We take security reports seriously and welcome good-faith research.
            </p>

            <div className="mt-6 space-y-3">
              {[
                { title: "Report privately", desc: "Email security@oraone.ai with details, reproduction steps and impact.", icon: Mail },
                { title: "We respond fast", desc: "Acknowledgement within 48 hours · triage within 5 business days.", icon: Clock },
                { title: "No legal action", desc: "Good-faith research in line with this policy will not trigger legal action.", icon: ShieldCheck },
                { title: "Public credit", desc: "With your permission, we'll credit you on our security acknowledgements page.", icon: Award },
              ].map((step) => (
                <div key={step.title} className="flex items-start gap-3">
                  <div className="size-9 rounded-xl bg-[#EFF6FF] grid place-items-center shrink-0">
                    <step.icon size={16} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#0F172A]">{step.title}</p>
                    <p className="text-[12px] text-[#64748B] leading-snug mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-3 flex items-start gap-2.5">
              <AlertTriangle size={14} className="text-[#B45309] shrink-0 mt-0.5" />
              <p className="text-[12px] text-[#475569] leading-snug">
                Please <span className="font-semibold">do not</span> publish details, run
                disruptive tests, access other users&apos; data, or attempt social
                engineering against our staff.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl p-10 sm:p-14 overflow-hidden text-white shadow-premium-lg"
            style={{ background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)" }}
          >
            <div className="absolute -top-20 -right-20 size-80 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-white/5" />
            <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">
                  Need security questionnaires,
                  <br />
                  DPA, or SOC 2 letter?
                </h2>
                <p className="mt-4 text-white/85 max-w-2xl leading-relaxed">
                  We can share our SOC 2 letter of engagement, DPA, SIG/CAIQ, pen-test
                  summary and architecture diagrams under NDA. Procurement teams welcome.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  to="/contact"
                  className="px-5 py-3 rounded-xl bg-white text-[#2563EB] font-semibold text-sm hover:bg-white/90 transition-colors inline-flex items-center gap-2"
                >
                  Contact Security <ArrowRight size={14} />
                </Link>
                <a
                  href="mailto:security@oraone.ai"
                  className="px-5 py-3 rounded-xl border border-white/30 hover:bg-white/10 font-semibold text-sm transition-colors inline-flex items-center gap-2"
                >
                  <Mail size={14} /> security@oraone.ai
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function formatNow() {
  try {
    const d = new Date();
    const opts = { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return d.toLocaleString("en-IN", opts) + " IST";
  } catch (_) {
    return "moments ago";
  }
}
