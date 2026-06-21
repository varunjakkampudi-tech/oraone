import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useSEO } from "@/lib/seo";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

// Category color tokens
const CAT_STYLES = {
  CRM: { bg: "#FEE2E2", color: "#DC2626" },
  Calendar: { bg: "#DBEAFE", color: "#2563EB" },
  Communication: { bg: "#DBEAFE", color: "#2563EB" },
  Productivity: { bg: "#DCFCE7", color: "#16A34A" },
  Other: { bg: "#EDE9FE", color: "#7C3AED" },
};

const INTEGRATIONS = [
  { slug: "google-calendar", name: "Google Calendar", category: "Calendar", desc: "Book appointments and manage schedules automatically.", logo: "google-calendar" },
  { slug: "gmail", name: "Gmail", category: "Communication", desc: "Send emails, receive inbound messages and automate replies.", logo: "gmail" },
  { slug: "whatsapp", name: "WhatsApp Business", category: "Communication", desc: "Connect WhatsApp Business API and automate conversations.", logo: "whatsapp" },
  { slug: "slack", name: "Slack", category: "Communication", desc: "Get notified about new leads, conversations and updates.", logo: "slack" },
  { slug: "hubspot", name: "HubSpot", category: "CRM", desc: "Sync leads, contacts and activities with HubSpot CRM.", logo: "hubspot" },
  { slug: "zoho", name: "Zoho CRM", category: "CRM", desc: "Sync leads, update deals and sync customer data.", logo: "zoho" },
  { slug: "webhook", name: "Webhook", category: "Other", desc: "Send real-time events to your system via webhook.", logo: "webhook" },
  { slug: "api", name: "API", category: "Other", desc: "Build custom integrations using OraOne REST API.", logo: "api" },
  { slug: "salesforce", name: "Salesforce", category: "CRM", desc: "Sync leads and contacts to Salesforce CRM.", logo: "salesforce" },
  { slug: "outlook", name: "Microsoft Outlook", category: "Calendar", desc: "Schedule meetings and sync events with Outlook.", logo: "outlook" },
  { slug: "teams", name: "Microsoft Teams", category: "Communication", desc: "Receive alerts and notifications in Teams channels.", logo: "teams" },
  { slug: "pipedrive", name: "Pipedrive", category: "CRM", desc: "Create deals from qualified conversations.", logo: "pipedrive" },
];

const CATEGORIES = ["All", "CRM", "Calendar", "Communication", "Productivity"];

export default function IntegrationsPage() {
  const [active, setActive] = useState("All");
  useSEO({
    title: "Integrations",
    description: "Connect OraOne with Salesforce, HubSpot, Zoho, Google Calendar, Slack and many more — automate workflows and streamline operations.",
  });

  const list = active === "All" ? INTEGRATIONS : INTEGRATIONS.filter((i) => i.category === active);

  return (
    <div className="bg-white">
      {/* ====== HERO ====== */}
      <section className="relative pt-24 pb-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span {...fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-xs font-bold tracking-[0.2em] text-[#2563EB]">
            <span className="size-1.5 rounded-full bg-[#2563EB]" />
            SEAMLESS INTEGRATIONS
          </motion.span>
          <motion.h1 {...fadeUp} className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#0F172A]">
            Integrate with Your <span className="gradient-text">Favorite Tools</span>
          </motion.h1>
          <motion.p {...fadeUp} className="mt-5 text-[#64748B] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Connect OraOne with the tools you use every day.<br className="hidden sm:block" /> Automate workflows and streamline your operations.
          </motion.p>

          {/* Filter pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                data-testid={`integrations-filter-${c.toLowerCase()}`}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === c
                    ? "bg-[#2563EB] text-white shadow-[0_8px_24px_-6px_rgba(37,99,235,0.45)]"
                    : "bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INTEGRATION GRID ====== */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {list.map((i, idx) => {
              const cat = CAT_STYLES[i.category] || CAT_STYLES.Other;
              return (
                <motion.div
                  key={i.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03, duration: 0.4 }}
                  className="group rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-premium-lg transition-all p-6 flex flex-col"
                  data-testid={`integration-card-${i.slug}`}
                >
                  <BrandLogo name={i.logo} />

                  <h3 className="mt-5 text-lg font-bold tracking-tight text-[#0F172A]">{i.name}</h3>
                  <span
                    className="mt-1.5 inline-flex items-center self-start px-2.5 py-0.5 rounded-md text-[11px] font-semibold"
                    style={{ background: cat.bg, color: cat.color }}
                  >
                    {i.category}
                  </span>

                  <p className="mt-3 text-sm text-[#64748B] leading-relaxed flex-1">{i.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ====== COMING SOON BANNER ====== */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-8 sm:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left illustration */}
              <ConnectionIllustration />

              {/* Right text */}
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] text-[10px] font-bold tracking-[0.2em] text-[#2563EB]">
                  <Sparkles size={10} /> MORE INTEGRATIONS COMING SOON
                </span>
                <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight">
                  We're adding more integrations every month.
                </h2>
                <p className="mt-4 text-[#64748B] leading-relaxed">
                  Can't find the integration you need? Our team can help you build a custom integration.
                </p>
                <Link
                  to="/contact"
                  data-testid="integrations-request-cta"
                  className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-semibold text-sm transition-all"
                >
                  Request an Integration <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   Brand logo tiles — inline SVGs colored to feel like the real brand mark.
   ========================================================================= */
function BrandLogo({ name }) {
  const w = 52;
  switch (name) {
    case "google-calendar":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          {/* White body with rainbow Google border */}
          <rect x="6" y="6" width="36" height="36" rx="5" fill="white" stroke="#E2E8F0" />
          {/* Top stripe = blue */}
          <rect x="6" y="6" width="36" height="5" rx="2.5" fill="#4285F4" />
          {/* Right stripe = green */}
          <rect x="37" y="6" width="5" height="36" rx="2.5" fill="#34A853" />
          {/* Bottom stripe = yellow */}
          <rect x="6" y="37" width="36" height="5" rx="2.5" fill="#FBBC04" />
          {/* Left stripe = red */}
          <rect x="6" y="6" width="5" height="36" rx="2.5" fill="#EA4335" />
          {/* Center white area */}
          <rect x="11" y="11" width="26" height="26" fill="white" />
          {/* "31" in Google blue */}
          <text x="24" y="31" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4285F4" fontFamily="Inter, Roboto, sans-serif">31</text>
        </svg>
      );
    case "gmail":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          {/* Envelope outer */}
          <rect x="5" y="12" width="38" height="26" rx="4" fill="#FFFFFF" stroke="#E5E7EB" />
          {/* Left red side */}
          <path d="M5 16 a4 4 0 0 1 4 -4 h2 v26 H9 a4 4 0 0 1 -4 -4 Z" fill="#EA4335" />
          {/* Right red side */}
          <path d="M43 16 a4 4 0 0 0 -4 -4 h-2 v26 h2 a4 4 0 0 0 4 -4 Z" fill="#EA4335" />
          {/* Center M (red) */}
          <path d="M11 38 V18 L24 27 L37 18 V38 H31 V26 L24 31 L17 26 V38 Z" fill="#EA4335" />
        </svg>
      );
    case "whatsapp":
      return (
        <div className="size-12 rounded-2xl grid place-items-center" style={{ background: "#25D366" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
            <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5.1-1.3c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.4.9.9-3.3-.2-.4c-.9-1.4-1.3-3-1.3-4.7 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z" />
          </svg>
        </div>
      );
    case "slack":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          {/* Slack — 4-color hashtag arrangement */}
          {/* Pink L (top-left) — vertical + top horizontal */}
          <rect x="14" y="6" width="6" height="18" rx="3" fill="#E01E5A" />
          <rect x="14" y="6" width="14" height="6" rx="3" fill="#E01E5A" />
          {/* Cyan L (top-right) — horizontal + right vertical */}
          <rect x="28" y="14" width="14" height="6" rx="3" fill="#36C5F0" />
          <rect x="28" y="14" width="6" height="14" rx="3" fill="#36C5F0" />
          {/* Green L (bottom-right) — vertical + bottom horizontal */}
          <rect x="28" y="24" width="6" height="18" rx="3" fill="#2EB67D" />
          <rect x="20" y="36" width="14" height="6" rx="3" fill="#2EB67D" />
          {/* Yellow L (bottom-left) — horizontal + left vertical */}
          <rect x="6" y="28" width="14" height="6" rx="3" fill="#ECB22E" />
          <rect x="14" y="28" width="6" height="14" rx="3" fill="#ECB22E" />
        </svg>
      );
    case "hubspot":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          {/* Top-right circle outline */}
          <circle cx="34" cy="20" r="9" fill="none" stroke="#FF7A59" strokeWidth="3" />
          {/* Center dot inside circle */}
          <circle cx="34" cy="20" r="2.5" fill="#FF7A59" />
          {/* Diagonal connecting line */}
          <line x1="14" y1="36" x2="28" y2="22" stroke="#FF7A59" strokeWidth="3" strokeLinecap="round" />
          {/* Top stem */}
          <line x1="34" y1="11" x2="34" y2="6" stroke="#FF7A59" strokeWidth="3" strokeLinecap="round" />
          {/* Top filled circle */}
          <circle cx="34" cy="6" r="2.8" fill="#FF7A59" />
          {/* Bottom-left filled circle */}
          <circle cx="12" cy="38" r="4" fill="#FF7A59" />
        </svg>
      );
    case "zoho":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          {/* Blue chain-link / connector */}
          <g stroke="#2563EB" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Left link */}
            <path d="M18 18 a8 8 0 1 0 0 12 h4" />
            {/* Right link */}
            <path d="M30 30 a8 8 0 1 0 0 -12 h-4" />
            {/* Crossbar */}
            <line x1="18" y1="24" x2="30" y2="24" />
          </g>
        </svg>
      );
    case "webhook":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          {/* Three circles connected like webhook icon */}
          <g stroke="#7C3AED" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="24" cy="14" r="5" />
            <circle cx="14" cy="34" r="5" />
            <circle cx="34" cy="34" r="5" />
            {/* Connector legs */}
            <path d="M22 18 L16 29" />
            <path d="M26 18 L32 29" />
            <path d="M19 34 H29" />
          </g>
          {/* Tiny center dot in each circle */}
          <circle cx="24" cy="14" r="1.6" fill="#7C3AED" />
          <circle cx="14" cy="34" r="1.6" fill="#7C3AED" />
          <circle cx="34" cy="34" r="1.6" fill="#7C3AED" />
        </svg>
      );
    case "api":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          {/* Left chevron < */}
          <path d="M18 14 L8 24 L18 34" stroke="#2563EB" strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right chevron > */}
          <path d="M30 14 L40 24 L30 34" stroke="#2563EB" strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Slash */}
          <line x1="28" y1="12" x2="20" y2="36" stroke="#2563EB" strokeWidth="3.6" strokeLinecap="round" />
        </svg>
      );
    case "salesforce":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          <path
            d="M14 22 Q14 16 20 16 Q22 12 27 13 Q32 11 35 16 Q42 16 41 23 Q43 27 38 30 Q37 35 30 35 Q26 38 21 34 Q14 36 13 30 Q9 28 14 22 Z"
            fill="#00A1E0"
          />
        </svg>
      );
    case "outlook":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          <rect x="6" y="12" width="22" height="24" rx="2" fill="#0078D4" />
          <text x="17" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="Inter, sans-serif">O</text>
          <rect x="30" y="16" width="14" height="20" rx="1" fill="#106EBE" />
          <rect x="32" y="18" width="10" height="4" fill="white" />
          <rect x="32" y="24" width="10" height="2" fill="white" opacity="0.6" />
          <rect x="32" y="28" width="6" height="2" fill="white" opacity="0.6" />
        </svg>
      );
    case "teams":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          <rect x="18" y="14" width="20" height="24" rx="2" fill="#5059C9" />
          <text x="28" y="32" textAnchor="middle" fontSize="14" fontWeight="800" fill="white" fontFamily="Inter, sans-serif">T</text>
          <circle cx="12" cy="20" r="6" fill="#7B83EB" />
        </svg>
      );
    case "pipedrive":
      return (
        <svg width={w} height={w} viewBox="0 0 48 48">
          <rect x="8" y="8" width="32" height="32" rx="6" fill="#1A1A1A" />
          <text x="24" y="32" textAnchor="middle" fontSize="20" fontWeight="800" fill="#10B981" fontFamily="Inter, sans-serif">P</text>
        </svg>
      );
    default:
      return <div className="size-12 rounded-2xl bg-[#F1F5F9] border border-[#E2E8F0]" />;
  }
}

/* =========================================================================
   Connection illustration for the "More integrations" banner.
   ========================================================================= */
function ConnectionIllustration() {
  return (
    <div className="relative h-64 lg:h-72">
      {/* Browser window mock */}
      <div className="absolute left-4 top-8 w-52 sm:w-60 rounded-2xl bg-white border border-[#E2E8F0] shadow-premium overflow-hidden">
        <div className="px-3 py-2 border-b border-[#E2E8F0] flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-yellow-400" />
          <span className="size-2 rounded-full bg-green-400" />
          <div className="ml-2 flex-1 h-2 rounded-full bg-[#F1F5F9]" />
        </div>
        <div className="p-3 space-y-2">
          <div className="h-2 rounded-full bg-[#F1F5F9] w-3/4" />
          <div className="h-2 rounded-full bg-[#F1F5F9] w-1/2" />
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <div className="h-8 rounded-lg bg-blue-100" />
            <div className="h-8 rounded-lg bg-cyan-100" />
            <div className="h-8 rounded-lg bg-purple-100" />
          </div>
        </div>
      </div>

      {/* Connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 280" fill="none" preserveAspectRatio="none">
        <path d="M 200 60 Q 300 50 320 110" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
        <path d="M 200 150 Q 280 180 310 200" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
        <path d="M 100 200 Q 60 220 80 250" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
      </svg>

      {/* Floating tool tiles */}
      <div className="absolute right-4 top-2 size-14 rounded-2xl bg-white border border-[#E2E8F0] shadow-premium grid place-items-center float-anim">
        <svg width="32" height="32" viewBox="0 0 48 48">
          <path d="M6 16 H42 V32 H6 Z" fill="#00A1E0" opacity="0.15" />
          <path
            d="M14 22 Q14 16 20 16 Q22 12 27 13 Q32 11 35 16 Q42 16 41 23 Q43 27 38 30 Q37 35 30 35 Q26 38 21 34 Q14 36 13 30 Q9 28 14 22 Z"
            fill="#00A1E0"
          />
        </svg>
      </div>

      <div className="absolute right-10 top-32 size-14 rounded-2xl bg-white border border-[#E2E8F0] shadow-premium grid place-items-center float-anim" style={{ animationDelay: "0.6s" }}>
        <svg width="28" height="28" viewBox="0 0 48 48">
          <circle cx="32" cy="22" r="10" fill="none" stroke="#FF7A59" strokeWidth="3" />
          <circle cx="32" cy="22" r="3" fill="#FF7A59" />
          <line x1="16" y1="36" x2="28" y2="24" stroke="#FF7A59" strokeWidth="3" strokeLinecap="round" />
          <circle cx="14" cy="38" r="4" fill="#FF7A59" />
        </svg>
      </div>

      <div className="absolute left-2 bottom-2 size-14 rounded-2xl bg-white border border-[#E2E8F0] shadow-premium grid place-items-center float-anim" style={{ animationDelay: "1.2s" }}>
        <svg width="26" height="26" viewBox="0 0 48 48">
          <rect x="6" y="8" width="36" height="36" rx="4" fill="white" />
          <rect x="6" y="8" width="36" height="8" rx="4" fill="#4285F4" />
          <text x="24" y="34" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4285F4" fontFamily="Inter, sans-serif">31</text>
        </svg>
      </div>
    </div>
  );
}
