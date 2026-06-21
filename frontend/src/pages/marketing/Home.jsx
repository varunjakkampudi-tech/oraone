import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  PhoneCall,
  Mail,
  MessageSquare,
  MessageCircle,
  Calendar,
  Clock,
  Sparkles,
  Globe2,
  Puzzle,
  Code2,
  ShieldCheck,
  Stethoscope,
  Home as HomeIcon,
  GraduationCap,
  Car,
  Wallet,
  ShoppingBag,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Star,
  Lock,
  KeyRound,
  FileCheck2,
  Cloud,
  Activity,
  ClipboardList,
} from "lucide-react";
import HeroOrb from "@/components/marketing/HeroOrb";
import { useSEO } from "@/lib/seo";
import { FAQ, TESTIMONIALS, LIVE_TRANSCRIPT } from "@/lib/mockData";
import { HOME } from "@/constants/testIds";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
};

const STATS = [
  { value: "10,000+", label: "Businesses Served" },
  { value: "50M+", label: "Conversations Handled" },
  { value: "24/7", label: "AI Agent Availability" },
  { value: "90%", label: "Queries Resolved Instantly" },
  { value: "3X", label: "More Conversions" },
];

const BENEFITS = [
  { icon: Clock, title: "24/7 Availability", desc: "Never miss a call or message again." },
  { icon: Sparkles, title: "Human-like Conversations", desc: "Natural, intelligent and context aware." },
  { icon: Globe2, title: "Multi-language", desc: "Support customers in 20+ languages." },
  { icon: Puzzle, title: "Easy Integrations", desc: "Works with your favorite tools." },
  { icon: Code2, title: "No Coding Required", desc: "Set up in minutes, not months." },
  { icon: ShieldCheck, title: "Secure & Reliable", desc: "Enterprise-grade security and uptime." },
];

const INDUSTRIES = [
  { icon: Stethoscope, name: "Healthcare", sub: "Improve patient experience" },
  { icon: HomeIcon, name: "Real Estate", sub: "Capture & qualify more leads" },
  { icon: GraduationCap, name: "Education", sub: "Engage students & parents" },
  { icon: ShieldCheck, name: "Insurance", sub: "Support, renewals & claims" },
  { icon: Wallet, name: "Finance", sub: "Onboard, support & reduce churn" },
  { icon: ShoppingBag, name: "Retail", sub: "Increase sales & customer loyalty" },
];

const INDUSTRY_USE_CASES = [
  { icon: Stethoscope, name: "Dental Clinics", desc: "Appointments & reminders." },
  { icon: HomeIcon, name: "Real Estate", desc: "Lead qualification & site visits." },
  { icon: GraduationCap, name: "Education", desc: "Admissions & student support." },
  { icon: ShieldCheck, name: "Insurance", desc: "Policy support & renewals." },
  { icon: Car, name: "Automotive", desc: "Service booking & support." },
  { icon: Wallet, name: "Finance", desc: "KYC, onboarding & customer support." },
];

const SUPPORTED_INTEGRATIONS = [
  { name: "WhatsApp", sub: "Business", color: "#25D366", glyph: "whatsapp" },
  { name: "Google", sub: "Login", color: "#4285F4", glyph: "google" },
  { name: "Gmail", sub: "Notifications", color: "#EA4335", glyph: "gmail" },
  { name: "CSV Export", sub: "(Leads)", color: "#2563EB", glyph: "csv" },
  { name: "REST API", sub: "(Coming Soon)", color: "#7C3AED", glyph: "api" },
];

const WORKS = [
  { num: 1, title: "Connect Channels", desc: "Add your phone, website or WhatsApp.", icon: Phone },
  { num: 2, title: "Create AI Agent", desc: "Train with your data & business goals.", icon: Sparkles },
  { num: 3, title: "AI Handles Conversations", desc: "Engages, qualifies & captures leads.", icon: MessageSquare },
  { num: 4, title: "No Coding Required", desc: "Set up in minutes, not months.", icon: Code2 },
  { num: 5, title: "Scale & Grow", desc: "Enterprise security and performance.", icon: Activity },
];

const SECURITY = [
  { icon: Lock, title: "AES-256", sub: "Encryption" },
  { icon: KeyRound, title: "Secure", sub: "Authentication" },
  { icon: FileCheck2, title: "GDPR", sub: "Ready" },
  { icon: Cloud, title: "AWS", sub: "Hosted" },
  { icon: Clock, title: "99.9%", sub: "Uptime" },
  { icon: ClipboardList, title: "Audit Logs", sub: "& Monitoring" },
];

export default function HomePage() {
  const nav = useNavigate();
  useSEO({
    title: "OraOne — AI Voice, Chat & WhatsApp Agents for Modern Businesses",
    description:
      "OraOne is an AI Agent Platform that answers calls, replies on chat and WhatsApp instantly, books appointments and captures leads 24/7.",
  });

  return (
    <div className="bg-white">
      {/* ====================== HERO ====================== */}
      <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-12 overflow-hidden bg-[#F8FAFC]">
        <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* LEFT — copy + agent cards + CTAs */}
            <motion.div {...fadeUp} className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[11px] font-semibold tracking-[0.2em] text-[#2563EB] shadow-sm">
                <span className="size-1.5 rounded-full bg-[#2563EB]" />
                AI AGENTS FOR MODERN BUSINESSES
              </span>
              <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.02] text-[#0F172A]">
                One AI.
                <br />
                <span className="gradient-text">Every Conversation.</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-[#64748B] leading-relaxed max-w-md">
                AI Voice Agents, Chat Agents and WhatsApp Agents that answer calls, reply
                instantly and convert more leads — 24/7.
              </p>

              {/* Agent cards */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: Phone, label: "Voice Agent", sub: "Answer calls and book appointments" },
                  { icon: MessageSquare, label: "Chat Agent", sub: "Engage website visitors in real-time" },
                  { icon: MessageCircle, label: "WhatsApp Agent", sub: "Automate WhatsApp conversations" },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-premium"
                  >
                    <div className="size-9 rounded-lg bg-[#EFF6FF] grid place-items-center mb-2">
                      <p.icon size={16} className="text-[#2563EB]" />
                    </div>
                    <p className="text-[13px] font-semibold text-[#0F172A]">{p.label}</p>
                    <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">{p.sub}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  data-testid={HOME.heroCtaPrimary}
                  onClick={() => nav("/contact")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-[0_8px_24px_-6px_rgba(37,99,235,0.5)] hover:shadow-[0_12px_32px_-6px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 transition-all"
                >
                  Book a Demo <ArrowRight size={16} />
                </button>
                <button
                  data-testid={HOME.heroCtaSecondary}
                  onClick={() => nav("/signup")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] text-sm font-semibold transition-colors"
                >
                  Start Free <ArrowRight size={16} />
                </button>
                <span className="text-xs text-[#64748B] inline-flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-[#10B981]" /> No credit card required
                </span>
              </div>
            </motion.div>

            {/* CENTER — orbit illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-4 hidden lg:flex justify-center"
            >
              <HeroOrb />
            </motion.div>

            {/* RIGHT — Live Agent Activity card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <LiveAgentActivity />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================== BUILT FOR MODERN BUSINESSES ====================== */}
      <section className="py-8 sm:py-10 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] uppercase tracking-[0.25em] text-[#64748B] font-semibold">
            Built for Modern Businesses
          </p>
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.name}
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E2E8F0]/70"
              >
                <div className="size-10 rounded-lg bg-[#EFF6FF] grid place-items-center shrink-0">
                  <ind.icon size={18} className="text-[#2563EB]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[#0F172A] truncate">{ind.name}</p>
                  <p className="text-[11px] text-[#64748B] leading-snug">{ind.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== STATS ====================== */}
      <section className="py-10 sm:py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#1E40AF] px-6 sm:px-12 py-10 text-white relative overflow-hidden shadow-premium-lg"
          >
            <div className="absolute -top-20 -right-20 size-72 rounded-full bg-white/5" />
            <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-white/5" />
            <div className="relative grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`text-center ${i > 0 ? "md:border-l md:border-white/15 md:pl-4" : ""}`}
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter">{s.value}</div>
                  <p className="mt-2 text-[12.5px] text-white/85">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================== WHY CHOOSE ====================== */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A]">
              Why Businesses Choose OraOne
            </h2>
            <p className="mt-4 text-[#64748B]">Powerful AI agents. Simple to use. Built to deliver results.</p>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium-lg transition-all duration-300 text-center"
              >
                <div className="size-12 rounded-xl bg-[#EFF6FF] grid place-items-center mb-4 mx-auto">
                  <b.icon size={22} className="text-[#2563EB]" />
                </div>
                <h3 className="text-base font-semibold text-[#0F172A]">{b.title}</h3>
                <p className="mt-2 text-[13px] text-[#64748B]">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== LIVE CONVERSATIONS (DARK + side text) ====================== */}
      <section className="py-14 sm:py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            {/* Dark dashboard mockup */}
            <div className="bg-[#0F172A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
                {/* Sidebar */}
                <div className="lg:col-span-3 border-r border-white/10 p-5 hidden lg:flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-5 text-white">
                    <div className="size-7 rounded-lg gradient-bg" />
                    <span className="font-semibold text-sm">OraOne</span>
                  </div>
                  {["Overview", "Conversations", "Leads", "Analytics", "Agents", "Templates", "Settings"].map((l, i) => (
                    <div
                      key={l}
                      className={`px-3 py-2 rounded-lg text-[13px] ${
                        i === 0 ? "bg-[#2563EB] text-white" : "text-white/60"
                      }`}
                    >
                      {l}
                    </div>
                  ))}
                </div>

                {/* Transcript */}
                <div className="lg:col-span-6 p-5 border-r border-white/10">
                  <p className="text-[10px] font-semibold text-white/50 tracking-wider mb-3">LIVE CONVERSATION</p>
                  <div className="space-y-2.5 max-h-[360px] overflow-hidden">
                    {LIVE_TRANSCRIPT.slice(0, 6).map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className={`flex ${m.who === "customer" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[88%] rounded-xl px-3.5 py-2 text-[12.5px] ${
                            m.who === "customer" ? "bg-[#2563EB] text-white" : "bg-white/10 text-white"
                          }`}
                        >
                          <p className="text-[9px] text-white/60 mb-0.5 uppercase tracking-wider">
                            {m.who} · {m.time}
                          </p>
                          {m.text}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Lead details */}
                <div className="lg:col-span-3 p-5 bg-black/10">
                  <p className="text-[10px] font-semibold text-white/50 tracking-wider mb-3">LEAD DETAILS (LIVE)</p>
                  <div className="space-y-2.5 text-[12.5px]">
                    <div>
                      <p className="text-white/50 text-[10px]">Name</p>
                      <p className="text-white font-medium">Rahul Sharma</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px]">Phone</p>
                      <p className="text-white font-medium">+91 98765 43210</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px]">Intent</p>
                      <p className="text-white font-medium">Book Appointment</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px]">Sentiment</p>
                      <p className="text-green-400 font-medium flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-green-400" /> Positive
                      </p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px]">Lead Score</p>
                      <p className="text-white font-medium">92 / 100</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px]">Status</p>
                      <p className="text-green-400 font-medium">Qualified</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[12px] font-medium">
                    Add to CRM
                  </button>
                </div>
              </div>
            </div>

            {/* Side text */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] text-[10px] font-bold tracking-[0.2em] text-[#2563EB]">
                <Sparkles size={11} /> SEE ORAONE IN ACTION
              </span>
              <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A] leading-[1.1]">
                Live conversations.
                <br />
                Real-time insights.
                <br />
                Automated results.
              </h2>
              <p className="mt-5 text-[#64748B] leading-relaxed max-w-md">
                Watch how OraOne AI agents handle calls, qualify leads and book appointments — in real time.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Live call & chat transcripts",
                  "Lead qualification in real time",
                  "Automatic CRM sync",
                  "Actionable analytics",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#0F172A]">
                    <span className="mt-0.5 size-5 rounded-full bg-[#2563EB] grid place-items-center shrink-0">
                      <CheckCircle2 size={12} className="text-white" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => nav("/contact")}
                className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-[0_8px_24px_-6px_rgba(37,99,235,0.5)] transition-all"
              >
                Book a Demo <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================== INDUSTRY USE CASES + SUPPORTED INTEGRATIONS ====================== */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Use cases */}
          <motion.div {...fadeUp}>
            <div className="flex items-end justify-between mb-7">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-[#0F172A]">Industry Use Cases</h2>
              <Link to="/solutions" className="text-sm font-medium text-[#2563EB] hover:underline whitespace-nowrap">
                View all solutions →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INDUSTRY_USE_CASES.map((ind) => (
                <Link
                  key={ind.name}
                  to="/solutions"
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium transition-all"
                >
                  <div className="size-10 rounded-xl bg-[#EFF6FF] grid place-items-center shrink-0">
                    <ind.icon size={18} className="text-[#2563EB]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A]">{ind.name}</p>
                    <p className="text-[12px] text-[#64748B] mt-0.5 leading-snug">{ind.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Supported integrations */}
          <motion.div {...fadeUp}>
            <div className="flex items-end justify-between mb-7">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-[#0F172A]">
                Supported Integrations
              </h2>
              <Link to="/integrations" className="text-sm font-medium text-[#2563EB] hover:underline whitespace-nowrap">
                View all integrations →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SUPPORTED_INTEGRATIONS.map((ig) => (
                <div
                  key={ig.name}
                  className="aspect-square rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium transition-all p-3 flex flex-col items-center justify-center text-center"
                >
                  <div
                    className="size-11 rounded-xl grid place-items-center mb-2 shrink-0"
                    style={{ background: `${ig.color}15` }}
                  >
                    <IntegrationGlyph slug={ig.glyph} color={ig.color} />
                  </div>
                  <p className="text-[12px] font-semibold text-[#0F172A] leading-tight">{ig.name}</p>
                  <p className="text-[10px] text-[#64748B] mt-0.5">{ig.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================== HOW IT WORKS ====================== */}
      <section className="py-14 sm:py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A]">How OraOne Works</h2>
            <p className="mt-4 text-[#64748B]">From setup to scale in five simple steps.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] gap-5 lg:gap-2 items-stretch lg:items-center">
            {WORKS.map((w, i) => (
              <React.Fragment key={w.num}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="text-center"
                >
                  <div className="mx-auto size-14 rounded-2xl gradient-bg grid place-items-center mb-3 shadow-[0_10px_24px_-8px_rgba(37,99,235,0.55)]">
                    <w.icon size={22} className="text-white" />
                  </div>
                  <p className="text-[10px] font-bold text-[#2563EB] tracking-[0.2em] mb-1">STEP {w.num}</p>
                  <h3 className="text-[14px] font-semibold text-[#0F172A]">{w.title}</h3>
                  <p className="mt-1 text-[12px] text-[#64748B] leading-snug max-w-[14rem] mx-auto">{w.desc}</p>
                </motion.div>
                {i < WORKS.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center text-[#94A3B8]">
                    <ChevronRight size={22} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== ENTERPRISE-GRADE SECURITY ====================== */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-[#0F172A]">
              Enterprise-Grade Security
            </h2>
          </motion.div>
          <div className="rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SECURITY.map((s) => (
              <div key={s.title} className="flex items-center gap-3">
                <div className="size-11 rounded-xl bg-[#EFF6FF] grid place-items-center shrink-0">
                  <s.icon size={18} className="text-[#2563EB]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0F172A] leading-tight">{s.title}</p>
                  <p className="text-[11.5px] text-[#64748B] leading-snug">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== TESTIMONIALS ====================== */}
      <section className="py-14 sm:py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A]">
              Real Results from Real Businesses
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-premium"
              >
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#0F172A] leading-relaxed text-[15px]">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] grid place-items-center text-white text-sm font-semibold">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{t.name}</p>
                    <p className="text-xs text-[#64748B]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== FAQ (2-COLUMN) ====================== */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A]">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 transition-colors"
              >
                <summary className="list-none p-5 flex items-center justify-between cursor-pointer gap-3">
                  <span className="text-[15px] font-semibold text-[#0F172A]">{f.q}</span>
                  <ChevronDown size={18} className="text-[#64748B] group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="px-5 pb-5 text-[#64748B] text-[14px] leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== FINAL CTA ====================== */}
      <section className="pb-14 sm:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl p-10 sm:p-14 overflow-hidden text-white shadow-premium-lg"
            style={{ background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)" }}
          >
            <div className="absolute -top-20 -right-20 size-80 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-white/5" />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter leading-tight">
                  Ready to Never Miss
                  <br />
                  Another Customer?
                </h2>
                <p className="mt-4 text-white/85 max-w-md">Deploy your AI agents in days, not months.</p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {["Free Beta Access", "No credit card required", "Cancel anytime"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-white/90 text-sm">
                      <CheckCircle2 size={16} /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => nav("/contact")}
                    className="px-5 py-3 rounded-xl bg-white text-[#2563EB] font-semibold text-sm hover:bg-white/90 transition-colors"
                    data-testid="cta-book-demo"
                  >
                    Book a Demo
                  </button>
                  <button
                    onClick={() => nav("/signup")}
                    className="px-5 py-3 rounded-xl border border-white/30 hover:bg-white/10 font-semibold text-sm transition-colors"
                    data-testid="cta-start-free"
                  >
                    Start Free
                  </button>
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <HeroOrb />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* =============================== Subcomponents =============================== */

function LiveAgentActivity() {
  const steps = [
    { icon: PhoneCall, title: "Incoming Call", sub: "+91 98765 43210", color: "#3B82F6" },
    { icon: MessageSquare, title: "AI Answered", sub: "in 2.3 sec", color: "#8B5CF6" },
    { icon: Star, title: "Lead Qualified", sub: "Interested in Dental Appointment", color: "#F59E0B" },
    { icon: Calendar, title: "Appointment Booked", sub: "Today, 4:30 PM", color: "#10B981" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-premium-lg p-5">
      <p className="text-sm font-bold text-[#0F172A]">Live Agent Activity</p>
      <ul className="mt-4 space-y-3">
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex items-start gap-3">
            <div
              className="size-9 rounded-xl grid place-items-center shrink-0"
              style={{ background: `${s.color}1A`, color: s.color }}
            >
              <s.icon size={16} />
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <p className="text-[13px] font-semibold text-[#0F172A] leading-tight">{s.title}</p>
              <p className="text-[11.5px] text-[#64748B] leading-snug mt-0.5">{s.sub}</p>
            </div>
            {i < steps.length - 1 && (
              <span
                className="absolute left-[17px] top-9 w-px h-5"
                style={{ background: "linear-gradient(180deg,#E2E8F0,#E2E8F0)" }}
              />
            )}
          </li>
        ))}
      </ul>
      <Link
        to="/app/conversations"
        className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#2563EB] hover:underline"
      >
        View Details <ArrowRight size={13} />
      </Link>
    </div>
  );
}

function IntegrationGlyph({ slug, color }) {
  const common = { width: 22, height: 22, fill: color };
  switch (slug) {
    case "whatsapp":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M20.52 3.48A11.84 11.84 0 0 0 12.06 0C5.53 0 .22 5.31.22 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.39-1.78a11.83 11.83 0 0 0 5.67 1.45h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.17-1.23-6.14-3.39-8.35Zm-8.46 18.02h-.01a9.66 9.66 0 0 1-4.93-1.35l-.35-.21-3.79 1.06 1.07-3.69-.23-.37a9.66 9.66 0 0 1-1.5-5.1c0-5.34 4.35-9.69 9.69-9.69 2.59 0 5.02 1.01 6.85 2.84a9.62 9.62 0 0 1 2.84 6.86c0 5.34-4.35 9.65-9.64 9.65Z" />
        </svg>
      );
    case "google":
      return (
        <svg width="22" height="22" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2 14-5.4l-6.5-5.5c-2 1.4-4.5 2.3-7.5 2.3-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.5 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.7 2.1-2 4-3.8 5.4l6.5 5.5C42.6 35.6 44 30.1 44 24c0-1.3-.1-2.4-.4-3.5z" />
        </svg>
      );
    case "gmail":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M22 6.5v11A2.5 2.5 0 0 1 19.5 20H17V10.5L12 14 7 10.5V20H4.5A2.5 2.5 0 0 1 2 17.5v-11A2.5 2.5 0 0 1 4.5 4H5l7 5 7-5h.5A2.5 2.5 0 0 1 22 6.5Z" fill="#EA4335" />
        </svg>
      );
    case "csv":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M9 14h6M9 17h4" strokeLinecap="round" />
        </svg>
      );
    case "api":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    default:
      return <Mail size={18} style={{ color }} />;
  }
}
