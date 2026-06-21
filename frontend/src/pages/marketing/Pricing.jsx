import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useSEO } from "@/lib/seo";

const tiers = [
  {
    name: "Starter",
    desc: "Perfect for trying out OraOne",
    features: ["1 AI Agent", "500 conversations/mo", "Email support", "Basic analytics"],
    cta: "Start Free",
  },
  {
    name: "Growth",
    desc: "For growing teams that need scale",
    features: ["5 AI Agents", "10,000 conversations/mo", "Priority support", "Advanced analytics", "CRM integrations"],
    cta: "Start Free",
    highlighted: true,
  },
  {
    name: "Enterprise",
    desc: "Custom solutions for large teams",
    features: ["Unlimited agents", "Unlimited conversations", "Dedicated CSM", "SSO + RBAC", "Custom integrations"],
    cta: "Contact Sales",
  },
];

export default function PricingPage() {
  useSEO({ title: "Pricing", description: "Free Beta Access — no credit card required. Pay only when you scale." });
  return (
    <div>
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold">
            <Sparkles size={12} /> FREE BETA ACCESS
          </span>
          <h1 className="mt-5 text-5xl sm:text-6xl font-bold tracking-tighter text-[#0F172A]">Simple, transparent pricing</h1>
          <p className="mt-4 text-[#64748B] max-w-2xl mx-auto">Get started for free during our beta. Pay only when you're ready to scale.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative rounded-3xl p-8 ${
                t.highlighted
                  ? "bg-[#0F172A] text-white border border-[#2563EB] shadow-premium-lg"
                  : "bg-white border border-[#E2E8F0]"
              }`}
            >
              {t.highlighted && (
                <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-[#2563EB] text-white text-[10px] font-semibold tracking-wider">MOST POPULAR</span>
              )}
              <h3 className={`text-lg font-bold ${t.highlighted ? "text-white" : "text-[#0F172A]"}`}>{t.name}</h3>
              <p className={`mt-1 text-sm ${t.highlighted ? "text-white/70" : "text-[#64748B]"}`}>{t.desc}</p>
              <div className="mt-6">
                <span className="text-5xl font-black tracking-tighter">$0</span>
                <span className={`text-sm ml-1 ${t.highlighted ? "text-white/60" : "text-[#64748B]"}`}>during beta</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${t.highlighted ? "text-white/90" : "text-[#0F172A]"}`}>
                    <Check size={16} className={t.highlighted ? "text-[#06B6D4]" : "text-[#2563EB]"} /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to={t.name === "Enterprise" ? "/contact" : "/signup"}
                data-testid={`pricing-${t.name.toLowerCase()}-cta`}
                className={`mt-8 block text-center px-5 py-3 rounded-xl font-semibold text-sm transition-colors ${
                  t.highlighted ? "bg-white text-[#0F172A] hover:bg-white/90" : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                }`}
              >
                {t.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
