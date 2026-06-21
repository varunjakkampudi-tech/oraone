import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Stethoscope, Home, Car, ShieldCheck, Utensils, Users,
  Phone, MessageSquare, MessageCircle, CheckCircle2, Rocket, ArrowRight,
} from "lucide-react";
import { useSEO } from "@/lib/seo";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const CHANNEL = {
  voice:    { icon: Phone,         label: "Voice Agent",    color: "#2563EB" },
  chat:     { icon: MessageSquare, label: "Chat Agent",     color: "#2563EB" },
  whatsapp: { icon: MessageCircle, label: "WhatsApp Agent", color: "#2563EB" },
};

const TEMPLATES = [
  { slug: "dental",     name: "Dental Clinic Receptionist", channel: "voice",    desc: "Handle incoming calls, book appointments and answer common dental queries.", icon: Stethoscope, color: "#3B82F6", bg: "#EFF6FF" },
  { slug: "realestate", name: "Real Estate Assistant",      channel: "chat",     desc: "Qualify leads, answer property questions and book site visits automatically.", icon: Home,        color: "#22C55E", bg: "#ECFDF5" },
  { slug: "carservice", name: "Car Service Booking",        channel: "whatsapp", desc: "Book car services, answer queries and send reminders via WhatsApp.",            icon: Car,         color: "#22C55E", bg: "#ECFDF5" },
  { slug: "insurance",  name: "Insurance Support Agent",    channel: "voice",    desc: "Answer policy questions, help with claims and connect customers to agents.",     icon: ShieldCheck, color: "#8B5CF6", bg: "#F3E8FF" },
  { slug: "restaurant", name: "Restaurant Reservation",     channel: "whatsapp", desc: "Take reservations, manage bookings and answer menu & availability queries.",     icon: Utensils,    color: "#EC4899", bg: "#FCE7F3" },
  { slug: "leadqual",   name: "Lead Qualification Agent",   channel: "chat",     desc: "Qualify leads, answer questions and route hot leads to your sales team.",        icon: Users,       color: "#3B82F6", bg: "#EFF6FF" },
];

export default function TemplatesPage() {
  useSEO({
    title: "Templates",
    description: "Quick-start with pre-built AI agent templates for your business needs — Dental, Real Estate, Insurance, Restaurant, Car Service and more.",
  });

  return (
    <div className="bg-white">
      {/* ====== HERO ====== */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-white">
        {/* Sparkle decorations */}
        <Sparkle top="18%" left="8%"  color="#3B82F6" />
        <Sparkle top="14%" left="32%" color="#22C55E" />
        <Sparkle top="46%" left="6%"  color="#06B6D4" />
        <Sparkle top="22%" right="10%" color="#F59E0B" />
        <Sparkle top="60%" right="8%"  color="#3B82F6" />
        <Sparkle top="68%" right="32%" color="#8B5CF6" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span {...fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-xs font-bold tracking-[0.2em] text-[#2563EB]">
            <span className="size-1.5 rounded-full bg-[#2563EB]" />
            AI AGENT TEMPLATES
          </motion.span>
          <motion.h1 {...fadeUp} className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#0F172A]">
            Pre-built <span className="gradient-text">AI Agent</span> Templates
          </motion.h1>
          <motion.p {...fadeUp} className="mt-5 text-[#64748B] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Quick-start with ready-to-use AI agent templates<br className="hidden sm:block" /> for your business needs.
          </motion.p>
        </div>
      </section>

      {/* ====== TEMPLATE GRID ====== */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((t, i) => {
              const ch = CHANNEL[t.channel];
              return (
                <motion.div
                  key={t.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-premium-lg transition-all p-6 flex gap-5"
                  data-testid={`template-card-${t.slug}`}
                >
                  {/* Left icon stack */}
                  <div className="flex-shrink-0 flex flex-col gap-3 w-[88px]">
                    <div className="aspect-square rounded-2xl grid place-items-center" style={{ background: t.bg }}>
                      <t.icon size={42} style={{ color: t.color }} strokeWidth={1.75} />
                    </div>
                    <div className="size-12 rounded-2xl bg-white border border-[#E2E8F0] grid place-items-center shadow-sm">
                      <ch.icon size={18} style={{ color: ch.color }} />
                    </div>
                  </div>

                  {/* Right content */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold tracking-tight text-[#0F172A] leading-snug">{t.name}</h3>
                      <span className="text-xs font-semibold text-[#2563EB] whitespace-nowrap">{ch.label}</span>
                    </div>
                    <p className="mt-2 text-sm text-[#64748B] leading-relaxed flex-1">{t.desc}</p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                        <CheckCircle2 size={14} /> Available in V1
                      </span>
                      <Link
                        to="/signup"
                        data-testid={`template-${t.slug}-use`}
                        className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-[0_6px_16px_-6px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 transition-all"
                      >
                        Use Template
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== MORE TEMPLATES BANNER ====== */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="size-16 rounded-2xl bg-white border border-[#E2E8F0] grid place-items-center shadow-sm flex-shrink-0">
                <Rocket size={28} className="text-[#2563EB]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold tracking-tight text-[#0F172A]">More templates coming soon!</h3>
                <p className="mt-1.5 text-sm text-[#64748B] leading-relaxed max-w-2xl">
                  We are building more industry-specific AI agent templates to help you automate conversations and grow your business faster.
                </p>
              </div>
              <Link
                to="/contact"
                data-testid="templates-request-cta"
                className="px-5 py-3 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#2563EB] hover:text-[#2563EB] text-[#0F172A] font-semibold text-sm inline-flex items-center gap-2 transition-all whitespace-nowrap"
              >
                Request a Template <ArrowRight size={14} />
              </Link>
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
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      aria-hidden="true"
    >
      <path d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z" fill={color} opacity="0.7" />
    </svg>
  );
}
