import React, { useMemo, useState } from "react";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

/* ---------- Integrations catalog ---------- */

const INTEGRATIONS = [
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    desc: "Sync leads and contacts to Salesforce CRM.",
    features: ["Leads Sync", "Contacts Sync"],
    iconBg: "#E6F0FF",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    desc: "Auto-create deals and update pipelines.",
    features: ["Deals", "Contacts", "Pipelines"],
    iconBg: "#FFEFE6",
  },
  {
    id: "zoho",
    name: "Zoho CRM",
    category: "CRM",
    desc: "Push qualified leads to Zoho.",
    features: ["Leads", "Contacts", "Deals"],
    iconBg: "#FEF3F2",
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    category: "CRM",
    desc: "Create deals from conversations.",
    features: ["Deals", "Contacts", "Activities"],
    iconBg: "#E9F8EE",
  },
  {
    id: "gcal",
    name: "Google Calendar",
    category: "Calendar",
    desc: "Book appointments directly in Google Calendar.",
    features: ["Events", "Scheduling", "Reminders"],
    iconBg: "#FFFFFF",
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    category: "Calendar",
    desc: "Schedule meetings in Outlook.",
    features: ["Meetings", "Calendar Sync", "Invites"],
    iconBg: "#E6F0FF",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    category: "Communication",
    desc: "Connect to WhatsApp Business API.",
    features: ["Messaging", "Notifications", "Templates"],
    iconBg: "#E9F8EE",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    desc: "Get notified of new leads in Slack.",
    features: ["Notifications", "Alerts", "Messages"],
    iconBg: "#FFFFFF",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    category: "Communication",
    desc: "Receive alerts in Teams channels.",
    features: ["Alerts", "Messages", "Channels"],
    iconBg: "#EEEAFE",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "Productivity",
    desc: "Send follow-up emails via Gmail.",
    features: ["Email", "Templates", "Tracking"],
    iconBg: "#FFFFFF",
  },
  {
    id: "webhook",
    name: "Webhook",
    category: "Other",
    desc: "Send events to any URL via webhook.",
    features: ["HTTP", "Real-time", "Custom Events"],
    iconBg: "#F3EBFF",
  },
  {
    id: "api",
    name: "API",
    category: "Other",
    desc: "Build custom integrations via REST API.",
    features: ["REST API", "Secure", "Custom"],
    iconBg: "#F3EBFF",
  },
];

const CATEGORIES = ["All", "CRM", "Calendar", "Communication", "Productivity", "Other"];

/* ---------- Page ---------- */

export default function Integrations() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? INTEGRATIONS : INTEGRATIONS.filter((i) => i.category === active)),
    [active]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">Integrations</h2>
        <p className="text-sm text-[#64748B] mt-1">
          Connect OraOne with your favorite tools and automate your workflow.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((c) => {
          const sel = active === c;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              data-testid={`integrations-cat-${c.toLowerCase()}`}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all border ${
                sel
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-[0_6px_16px_-6px_rgba(37,99,235,0.5)]"
                  : "bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((ig) => (
          <IntegrationCard key={ig.id} ig={ig} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Card ---------- */

function IntegrationCard({ ig }) {
  const handleConnect = () => toast.info(`${ig.name} connection coming soon.`);

  return (
    <div
      className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:shadow-premium hover:-translate-y-0.5 transition-all flex flex-col"
      data-testid={`integration-${ig.id}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="size-14 rounded-2xl grid place-items-center shrink-0 border border-[#E2E8F0]"
          style={{ background: ig.iconBg }}
        >
          <BrandGlyph id={ig.id} />
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-[15px] font-semibold text-[#0F172A] leading-tight">{ig.name}</p>
          <p className="text-[12px] text-[#94A3B8] mt-1">{ig.category}</p>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] text-[#475569] leading-relaxed">{ig.desc}</p>

      {/* Feature pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {ig.features.map((f, i) => (
          <FeaturePill key={f} label={f} idx={i} />
        ))}
      </div>

      <button
        onClick={handleConnect}
        data-testid={`integration-${ig.id}-connect`}
        className="mt-5 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[13px] font-semibold shadow-[0_8px_20px_-8px_rgba(37,99,235,0.5)] transition-colors"
      >
        Connect
        <Link2 size={13} className="opacity-90" />
      </button>
    </div>
  );
}

function FeaturePill({ label, idx }) {
  // Subtle palette variety — most green, occasional purple/amber for visual rhythm.
  const tones = [
    { bg: "#E9F8EE", fg: "#15803D" }, // green
    { bg: "#E9F8EE", fg: "#15803D" },
    { bg: "#F3EBFF", fg: "#6D28D9" }, // purple
    { bg: "#FEF3C7", fg: "#B45309" }, // amber
  ];
  const t = tones[idx % tones.length];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
      style={{ background: t.bg, color: t.fg }}
    >
      <span aria-hidden="true">✓</span>
      {label}
    </span>
  );
}

/* ---------- Brand glyphs (inline, multi-color) ---------- */

function BrandGlyph({ id }) {
  const s = { width: 30, height: 30 };
  switch (id) {
    case "salesforce":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="#00A1E0">
          <path d="M9.6 5.6a3.6 3.6 0 0 1 6.5-1A4.6 4.6 0 0 1 22 9.6c0 1-.3 2-.9 2.8a3.4 3.4 0 0 1-3.5 5.4 4.2 4.2 0 0 1-7.7 1.4 3.7 3.7 0 0 1-6-1.3A4.4 4.4 0 0 1 2 13.6 4.6 4.6 0 0 1 6.5 9c.6 0 1.1.1 1.6.3.4-1.5 1.6-2.7 3-3.2-.6-.1-1.1-.3-1.5-.5Z" />
        </svg>
      );
    case "hubspot":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="#FF7A59">
          <path d="M18.2 8.3V5.7a1.6 1.6 0 1 0-1.4 0v2.6a6.6 6.6 0 0 0-3 1l-7-5.4-1.2 1.5 6.7 5.2a6.5 6.5 0 0 0 .7 7.7l-2.2 2.2 1.5 1.5 2.2-2.3a6.6 6.6 0 1 0 3.7-12Zm-3.3 9.5a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Z" />
        </svg>
      );
    case "zoho":
      return (
        <svg {...s} viewBox="0 0 24 24">
          <text x="2" y="18" fontSize="13" fontFamily="Inter, system-ui" fontWeight="900" fill="#E73B36">zoho</text>
        </svg>
      );
    case "pipedrive":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="#1A7E45">
          <path d="M11.7 2C7.4 2 4 5.4 4 9.7c0 4.6 3.6 7.8 8 7.8h.4V22h3.4v-4.7c4-.6 6.8-4 6.8-7.8C22.5 5.2 18.7 2 11.7 2Zm.3 12.3c-2.6 0-4.6-2-4.6-4.6S9.4 5.1 12 5.1s4.6 2 4.6 4.6-2 4.6-4.6 4.6Z" />
        </svg>
      );
    case "gcal":
      return (
        <svg {...s} viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="3" fill="#FFFFFF" stroke="#E2E8F0" />
          <rect x="3" y="4" width="18" height="4" rx="2" fill="#4285F4" />
          <text x="12" y="18" textAnchor="middle" fontSize="9" fontFamily="Inter, system-ui" fontWeight="800" fill="#4285F4">31</text>
        </svg>
      );
    case "outlook":
      return (
        <svg {...s} viewBox="0 0 24 24">
          <rect x="2" y="6" width="12" height="14" rx="2" fill="#0078D4" />
          <text x="8" y="17" textAnchor="middle" fontSize="11" fontFamily="Inter, system-ui" fontWeight="900" fill="#FFFFFF">O</text>
          <path d="M15 9l6-2v12l-6-2V9z" fill="#106EBE" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="#25D366">
          <path d="M20.52 3.48A11.84 11.84 0 0 0 12.06 0C5.53 0 .22 5.31.22 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.39-1.78a11.83 11.83 0 0 0 5.67 1.45h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.17-1.23-6.14-3.39-8.35Zm-8.46 18.02h-.01a9.66 9.66 0 0 1-4.93-1.35l-.35-.21-3.79 1.06 1.07-3.69-.23-.37a9.66 9.66 0 0 1-1.5-5.1c0-5.34 4.35-9.69 9.69-9.69 2.59 0 5.02 1.01 6.85 2.84a9.62 9.62 0 0 1 2.84 6.86c0 5.34-4.35 9.65-9.64 9.65Z" />
        </svg>
      );
    case "slack":
      return (
        <svg {...s} viewBox="0 0 24 24">
          <rect x="3.5"  y="9.5"  width="5"  height="2.5" rx="1.25" fill="#36C5F0" />
          <rect x="9.5"  y="3.5"  width="2.5" height="5"  rx="1.25" fill="#2EB67D" />
          <rect x="15.5" y="12"   width="5"  height="2.5" rx="1.25" fill="#ECB22E" />
          <rect x="12"   y="15.5" width="2.5" height="5"  rx="1.25" fill="#E01E5A" />
          <rect x="9.5"  y="9.5"  width="5"  height="5"   rx="1.25" fill="#36C5F0" />
        </svg>
      );
    case "teams":
      return (
        <svg {...s} viewBox="0 0 24 24">
          <rect x="3" y="6" width="13" height="12" rx="2" fill="#5059C9" />
          <text x="9.5" y="16" textAnchor="middle" fontSize="11" fontFamily="Inter, system-ui" fontWeight="900" fill="#FFFFFF">T</text>
          <circle cx="19" cy="9" r="3" fill="#7B83EB" />
          <rect x="16" y="13" width="6" height="6" rx="1" fill="#7B83EB" />
        </svg>
      );
    case "gmail":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="2" fill="#FFFFFF" stroke="#E2E8F0" />
          <path d="M2 7l10 7 10-7" stroke="#EA4335" strokeWidth="1.6" fill="none" />
          <path d="M22 7v12a2 2 0 0 1-2 2h-3V11l-5 3.5L7 11v10H4a2 2 0 0 1-2-2V7" fill="#EA4335" opacity="0.15" />
        </svg>
      );
    case "webhook":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <circle cx="12" cy="6" r="2.5" />
          <path d="M8.2 16l3-6.4" />
          <path d="M15.8 16L12.8 9.6" />
          <path d="M8.5 18h7" />
        </svg>
      );
    case "api":
      return (
        <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    default:
      return null;
  }
}
