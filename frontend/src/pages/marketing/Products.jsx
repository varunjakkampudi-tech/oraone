import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, MessageCircle, ArrowRight, Check, Mail, MessageCircleMore } from "lucide-react";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";

const products = [
  {
    slug: "voice",
    title: "AI Voice Agent",
    desc: "Answer inbound calls 24/7 with human-like conversations. Book appointments, qualify leads and route calls intelligently.",
    icon: Phone,
    color: "#2563EB",
    features: ["20+ natural voices", "Call recording & transcripts", "Smart transfer to humans", "Multi-language support"],
  },
  {
    slug: "chat",
    title: "AI Chat Agent",
    desc: "Engage website visitors in real-time. Convert visitors into customers with an intelligent chat widget.",
    icon: MessageSquare,
    color: "#10B981",
    features: ["Custom widget themes", "Lead qualification", "Knowledge base trained", "CRM sync"],
  },
  {
    slug: "whatsapp",
    title: "WhatsApp Agent",
    desc: "Automate WhatsApp business conversations with rich media, quick replies and intelligent routing.",
    icon: MessageCircle,
    color: "#22C55E",
    features: ["Official WhatsApp Business", "Media & buttons", "Auto reply 24/7", "Human handoff"],
  },
];

const upcoming = [
  { name: "Email Agent", icon: Mail },
  { name: "SMS Agent", icon: MessageCircleMore },
];

export default function ProductsPage() {
  useSEO({ title: "Products", description: "Explore OraOne products: AI Voice Agent, Chat Agent and WhatsApp Agent." });
  return (
    <div>
      <section className="bg-[#0F172A] text-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter">Explore OraOne Products</h1>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">Powerful AI agents to automate every conversation across channels.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium-lg transition-all overflow-hidden"
              >
                <div className="p-8">
                  <div className="size-12 rounded-xl grid place-items-center mb-5" style={{ background: `${p.color}15` }}>
                    <p.icon size={22} style={{ color: p.color }} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#0F172A]">{p.title}</h3>
                  <p className="mt-2 text-[#64748B] leading-relaxed">{p.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#0F172A]">
                        <Check size={16} className="text-[#2563EB] mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:underline">Learn More <ArrowRight size={14} /></Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-3">Coming Soon</p>
            <div className="flex flex-wrap gap-3">
              {upcoming.map((u) => (
                <div key={u.name} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] text-sm font-medium text-[#0F172A]">
                  <u.icon size={16} className="text-[#64748B]" /> {u.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
