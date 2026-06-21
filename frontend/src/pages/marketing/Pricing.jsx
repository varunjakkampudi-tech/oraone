import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles, CheckCircle2, Check, Rocket, TrendingUp, Building2,
  Shield, FileText, ArrowUpCircle, Headphones,
} from "lucide-react";
import { useSEO } from "@/lib/seo";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const TIERS = [
  {
    slug: "starter",
    name: "Starter",
    tagline: "Perfect for trying out OraOne",
    icon: Rocket, iconBg: "#EFF6FF", iconColor: "#2563EB",
    priceColor: "text-[#2563EB]",
    features: ["1 AI Agent", "500 conversations/mo", "Email support", "Basic analytics"],
    cta: { label: "Start Free", to: "/signup", style: "bg-[#2563EB] hover:bg-[#1D4ED8] text-white" },
    dark: false,
  },
  {
    slug: "growth",
    name: "Growth",
    tagline: "For growing teams that need scale",
    icon: TrendingUp, iconBg: "#2563EB", iconColor: "#FFFFFF",
    priceColor: "text-white",
    features: ["5 AI Agents", "10,000 conversations/mo", "Priority support", "Advanced analytics", "CRM Integrations"],
    cta: { label: "Start Free", to: "/signup", style: "bg-white hover:bg-white/90 text-[#0F172A]" },
    dark: true,
    badge: "MOST POPULAR",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    tagline: "Custom solutions for large teams",
    icon: Building2, iconBg: "#F3E8FF", iconColor: "#7C3AED",
    priceColor: "text-[#7C3AED]",
    features: ["Unlimited agents", "Unlimited conversations", "Dedicated CSM", "SSO + RBAC", "Custom integrations"],
    cta: { label: "Contact Sales", to: "/contact", style: "bg-[#7C3AED] hover:bg-[#6D28D9] text-white" },
    dark: false,
  },
];

const TRUST = [
  { icon: Shield,       title: "100% Secure",     desc: "Enterprise-grade security to protect your data.",     color: "#2563EB", bg: "#EFF6FF" },
  { icon: FileText,     title: "No Hidden Fees",  desc: "Transparent pricing with no surprise charges.",       color: "#22C55E", bg: "#ECFDF5" },
  { icon: ArrowUpCircle, title: "Scale Anytime",  desc: "Upgrade or downgrade as your needs change.",          color: "#F59E0B", bg: "#FEF3C7" },
  { icon: Headphones,   title: "24/7 Support",    desc: "We're here to help you succeed always.",              color: "#8B5CF6", bg: "#F3E8FF" },
];

export default function PricingPage() {
  useSEO({
    title: "Pricing",
    description: "Free Beta Access — no credit card required. Simple, transparent pricing. Pay only when you're ready to scale.",
  });

  return (
    <div className="bg-white">
      {/* ====== HERO ====== */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-white">
        {/* Decorative wave dots (sides) */}
        <WaveDots side="left" />
        <WaveDots side="right" />
        {/* Sparkle accents */}
        <Sparkle top="22%" left="11%" color="#8B5CF6" />
        <Sparkle top="40%" left="6%" color="#06B6D4" />
        <Sparkle top="28%" right="10%" color="#2563EB" />
        <Sparkle top="55%" right="6%" color="#22C55E" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span {...fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-xs font-bold tracking-[0.2em] text-[#2563EB]">
            <Sparkles size={12} /> FREE BETA ACCESS
          </motion.span>
          <motion.h1 {...fadeUp} className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#0F172A]">
            Simple, transparent <span className="gradient-text">pricing</span>
          </motion.h1>
          <motion.p {...fadeUp} className="mt-5 text-[#64748B] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Get started for free during our beta. Pay only when you're ready to scale.
          </motion.p>

          <motion.div {...fadeUp} className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
            {["No credit card required", "Cancel anytime", "Upgrade in seconds"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-[#475569]">
                <CheckCircle2 size={16} className="text-[#22C55E]" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====== PRICING CARDS ====== */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {TIERS.map((t, i) => (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  t.dark
                    ? "bg-[#0F172A] text-white border-2 border-[#2563EB] shadow-[0_20px_60px_-12px_rgba(37,99,235,0.45)] lg:-mt-4 lg:mb-[-1rem]"
                    : "bg-white border border-[#E2E8F0] shadow-premium"
                }`}
                data-testid={`pricing-card-${t.slug}`}
              >
                {t.badge && (
                  <span className="absolute top-7 right-7 px-3 py-1 rounded-md bg-[#2563EB] text-white text-[10px] font-bold tracking-wider">
                    {t.badge}
                  </span>
                )}

                {/* Header: icon + title */}
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-xl grid place-items-center flex-shrink-0" style={{ background: t.iconBg }}>
                    <t.icon size={20} style={{ color: t.iconColor }} />
                  </div>
                  <div className="pt-0.5">
                    <h3 className={`text-2xl font-bold tracking-tight ${t.dark ? "text-white" : "text-[#0F172A]"}`}>{t.name}</h3>
                    <p className={`mt-1 text-sm ${t.dark ? "text-white/65" : "text-[#64748B]"}`}>{t.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-7 flex items-baseline gap-2">
                  <span className={`text-6xl font-black tracking-tighter ${t.priceColor}`}>$0</span>
                  <span className={`text-sm ${t.dark ? "text-white/65" : "text-[#64748B]"}`}>during beta</span>
                </div>

                {/* Divider */}
                <div className={`my-6 border-t ${t.dark ? "border-white/15" : "border-[#E2E8F0]"}`} />

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className={`flex items-center gap-3 text-sm ${t.dark ? "text-white/90" : "text-[#0F172A]"}`}>
                      <span className="size-5 rounded-full grid place-items-center flex-shrink-0" style={{ background: t.dark ? "rgba(37,99,235,0.9)" : "#2563EB" }}>
                        <Check size={12} className="text-white" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={t.cta.to}
                  data-testid={`pricing-${t.slug}-cta`}
                  className={`mt-8 block text-center px-5 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${t.cta.style}`}
                >
                  {t.cta.label}
                </Link>
                <p className={`mt-3 text-center text-xs ${t.dark ? "text-white/55" : "text-[#94A3B8]"}`}>Free during beta</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TRUST STRIP ====== */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] px-6 sm:px-8 py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST.map((t) => (
                <div key={t.title} className="flex items-start gap-4">
                  <div className="size-12 rounded-full grid place-items-center flex-shrink-0" style={{ background: t.bg }}>
                    <t.icon size={20} style={{ color: t.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A]">{t.title}</p>
                    <p className="mt-1 text-xs text-[#64748B] leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function Sparkle({ top, left, right, color }) {
  return (
    <svg
      className="absolute"
      style={{ top, left, right }}
      width="14" height="14" viewBox="0 0 16 16" fill="none"
      aria-hidden="true"
    >
      <path d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z" fill={color} opacity="0.7" />
    </svg>
  );
}

function WaveDots({ side }) {
  const dots = [];
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 8; j++) {
      dots.push({ x: i * 14, y: j * 18, o: 0.05 + (j / 8) * 0.35 });
    }
  }
  return (
    <div
      className={`absolute top-12 ${side === "left" ? "left-0" : "right-0"} pointer-events-none hidden md:block`}
      style={{ width: 180, height: 200 }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="0 0 180 200">
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={side === "left" ? 180 - d.x : d.x}
            cy={d.y + Math.sin((d.x + d.y) * 0.15) * 6 + 20}
            r="1.6"
            fill="#94A3B8"
            opacity={d.o}
          />
        ))}
      </svg>
    </div>
  );
}
