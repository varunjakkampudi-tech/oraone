import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  MessageSquare,
  MessageCircle,
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
  Hotel,
  CheckCircle2,
  Mic,
  PhoneOff,
  ChevronDown,
  Star,
} from "lucide-react";
import HeroOrb from "@/components/marketing/HeroOrb";
import { useSEO } from "@/lib/seo";
import { FAQ, INDUSTRY_USE_CASES, INTEGRATIONS, TESTIMONIALS, LIVE_TRANSCRIPT } from "@/lib/mockData";
import { HOME } from "@/constants/testIds";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
};

const stats = [
  { value: "95%", label: "Call Answer Rate" },
  { value: "70%", label: "Lower Support Costs" },
  { value: "24/7", label: "AI Agent Availability" },
  { value: "3X", label: "More Bookings" },
  { value: "2.5X", label: "Lead Conversion" },
];

const benefits = [
  { icon: Clock, title: "24/7 Availability", desc: "Never miss a call or message again." },
  { icon: Sparkles, title: "Human-like Conversations", desc: "Natural, intelligent and context aware." },
  { icon: Globe2, title: "Multi-language", desc: "Support customers in 20+ languages." },
  { icon: Puzzle, title: "Easy Integrations", desc: "Works with your favorite tools." },
  { icon: Code2, title: "No Coding Required", desc: "Set up in minutes, not months." },
  { icon: ShieldCheck, title: "Secure & Reliable", desc: "Enterprise-grade security and uptime." },
];

const industryIcons = { Stethoscope, Home: HomeIcon, GraduationCap, ShieldCheck, Car, Wallet, ShoppingBag, Hotel };

const works = [
  { num: 1, title: "Connect Channels", desc: "Add your phone, website or WhatsApp.", icon: Phone },
  { num: 2, title: "Create AI Agent", desc: "Train with your data & behavior.", icon: Sparkles },
  { num: 3, title: "AI Handles Conversations", desc: "Engages, qualifies & captures leads.", icon: MessageSquare },
  { num: 4, title: "No Coding Required", desc: "Set up in minutes, not months.", icon: Code2 },
  { num: 5, title: "Scalable for Growth", desc: "Enterprise security and uptime.", icon: ShieldCheck },
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
      {/* HERO */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden bg-[#F8FAFC]">
        <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold tracking-wider text-[#2563EB] shadow-sm">
                <span className="size-1.5 rounded-full bg-[#2563EB]" />
                AI AGENTS FOR MODERN BUSINESSES
              </span>
              <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.02] text-[#0F172A]">
                One AI.<br />
                <span className="gradient-text">Every Conversation.</span>
              </h1>
              <p className="mt-6 text-lg text-[#64748B] leading-relaxed max-w-xl">
                AI Voice Agents, Chat Agents and WhatsApp Agents that answer calls, reply
                instantly and convert more leads — 24/7.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
                {[
                  { icon: Phone, label: "Voice Agent", sub: "Answer calls and book appointments" },
                  { icon: MessageSquare, label: "Chat Agent", sub: "Engage website visitors in real-time" },
                  { icon: MessageCircle, label: "WhatsApp Agent", sub: "Automate WhatsApp conversations" },
                ].map((p) => (
                  <div key={p.label} className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-premium">
                    <div className="size-9 rounded-lg bg-[#EFF6FF] grid place-items-center mb-2">
                      <p.icon size={16} className="text-[#2563EB]" />
                    </div>
                    <p className="text-sm font-semibold text-[#0F172A]">{p.label}</p>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-snug">{p.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
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
                <span className="text-xs text-[#64748B]">✓ No credit card required</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <HeroOrb />
            </motion.div>
          </div>

          {/* Trusted bar */}
          <div className="mt-20 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#64748B] font-semibold">Trusted by growing businesses</p>
            <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-8 items-center opacity-70">
              {["Apollo", "Coldwell", "RE/MAX", "Jockey", "Mapsko", "Drive X"].map((n) => (
                <div key={n} className="text-center text-[#475569] font-bold tracking-tight text-sm sm:text-base">{n}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#1E40AF] p-8 sm:p-12 text-white relative overflow-hidden shadow-premium-lg">
            <div className="absolute -top-20 -right-20 size-72 rounded-full bg-white/5" />
            <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-white/5" />
            <div className="relative grid grid-cols-2 md:grid-cols-5 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl sm:text-5xl font-black tracking-tighter">{s.value}</div>
                  <p className="mt-2 text-sm text-white/80">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A]">Why Businesses Choose OraOne</h2>
            <p className="mt-4 text-[#64748B]">Built for modern businesses. Designed to deliver results.</p>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium-lg transition-all duration-300"
              >
                <div className="size-11 rounded-xl bg-[#EFF6FF] grid place-items-center mb-4">
                  <b.icon size={20} className="text-[#2563EB]" />
                </div>
                <h3 className="text-base font-semibold text-[#0F172A]">{b.title}</h3>
                <p className="mt-1.5 text-sm text-[#64748B]">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE DEMO PREVIEW (dark) */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A]">See OraOne in Action</h2>
            <p className="mt-4 text-[#64748B]">Live conversation. Real-time insights. Automated results.</p>
          </motion.div>

          <motion.div {...fadeUp} className="bg-[#0F172A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
              {/* Left dashboard nav mock */}
              <div className="lg:col-span-3 border-r border-white/10 p-6 hidden lg:flex flex-col">
                <div className="flex items-center gap-2 mb-8 text-white">
                  <div className="size-8 rounded-lg gradient-bg" />
                  <span className="font-semibold">OraOne</span>
                </div>
                <div className="space-y-3.5 mb-8 px-3 py-3 rounded-xl bg-white/5">
                  <div className="text-xs text-white/50">Voice Agent</div>
                  <div className="text-sm text-white font-medium flex items-center gap-2"><span className="size-2 rounded-full bg-green-400 animate-pulse" /> Active Call · 02:35</div>
                  <div className="flex items-center gap-1 h-7">
                    {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6, 1, 0.4, 0.7, 0.5].map((h, i) => (
                      <span key={i} className="block w-[3px] rounded-full bg-gradient-to-t from-blue-500 to-cyan-400 wave-bar" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.07}s` }} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white flex items-center justify-center gap-1.5"><Mic size={12} /> Mute</button>
                    <button className="flex-1 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 text-xs flex items-center justify-center gap-1.5"><PhoneOff size={12} /> End Call</button>
                  </div>
                </div>
                <nav className="space-y-1 text-sm">
                  {["Overview", "Agents", "Conversations", "Leads", "Analytics", "Integrations", "Settings"].map((l, i) => (
                    <div key={l} className={`px-3 py-2 rounded-lg ${i === 0 ? "bg-[#2563EB] text-white" : "text-white/60"}`}>{l}</div>
                  ))}
                </nav>
              </div>

              {/* Transcript */}
              <div className="lg:col-span-6 p-6 border-r border-white/10">
                <p className="text-xs font-semibold text-white/50 tracking-wider mb-4">LIVE TRANSCRIPT</p>
                <div className="space-y-3 max-h-[440px] overflow-hidden">
                  {LIVE_TRANSCRIPT.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={`flex ${m.who === "customer" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.who === "customer" ? "bg-[#2563EB] text-white" : "bg-white/10 text-white"}`}>
                        <p className="text-[10px] text-white/60 mb-0.5 uppercase tracking-wider">{m.who} · {m.time}</p>
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Lead details */}
              <div className="lg:col-span-3 p-6 bg-black/10">
                <p className="text-xs font-semibold text-white/50 tracking-wider mb-4">LEAD DETAILS (LIVE)</p>
                <div className="space-y-4 text-sm">
                  <div><p className="text-white/50 text-xs">Name</p><p className="text-white font-medium">Rahul Sharma</p></div>
                  <div><p className="text-white/50 text-xs">Phone</p><p className="text-white font-medium">+91 98765 43210</p></div>
                  <div><p className="text-white/50 text-xs">Intent</p><p className="text-white font-medium">Book Appointment</p></div>
                  <div><p className="text-white/50 text-xs">Sentiment</p><p className="text-green-400 font-medium flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-green-400" /> Positive</p></div>
                  <div><p className="text-white/50 text-xs">Lead Score</p><p className="text-white font-medium">92 / 100</p></div>
                  <div><p className="text-white/50 text-xs">Status</p><p className="text-green-400 font-medium">Qualified</p></div>
                </div>
                <button className="mt-6 w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium">Add to CRM</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INDUSTRY USE CASES + INTEGRATIONS (split) */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div {...fadeUp}>
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-[#0F172A]">Industry Use Cases</h2>
              <Link to="/solutions" className="text-sm font-medium text-[#2563EB] hover:underline whitespace-nowrap">View all solutions →</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {INDUSTRY_USE_CASES.map((ind) => {
                const Icon = industryIcons[ind.icon] || HomeIcon;
                return (
                  <Link to={`/solutions`} key={ind.slug} className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium transition-all">
                    <div className="size-10 rounded-xl bg-[#EFF6FF] grid place-items-center mb-3">
                      <Icon size={18} className="text-[#2563EB]" />
                    </div>
                    <p className="text-sm font-semibold text-[#0F172A]">{ind.name}</p>
                    <p className="text-xs text-[#64748B] mt-1 leading-snug">{ind.desc}</p>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...fadeUp}>
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-[#0F172A]">Powerful Integrations</h2>
              <Link to="/integrations" className="text-sm font-medium text-[#2563EB] hover:underline whitespace-nowrap">View all integrations →</Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {INTEGRATIONS.slice(0, 9).map((ig) => (
                <div key={ig.slug} className="aspect-square rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium transition-all p-3 flex flex-col items-center justify-center text-center">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 grid place-items-center mb-2">
                    <span className="text-sm font-bold text-[#2563EB]">{ig.name.slice(0, 1)}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#0F172A] leading-tight">{ig.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A]">How OraOne Works</h2>
            <p className="mt-4 text-[#64748B]">From setup to scale in five simple steps.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {works.map((w, i) => (
              <motion.div
                key={w.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0]"
              >
                <div className="size-10 rounded-xl gradient-bg grid place-items-center mb-3">
                  <w.icon size={18} className="text-white" />
                </div>
                <p className="text-xs font-semibold text-[#2563EB] tracking-wider mb-1">STEP {w.num}</p>
                <h3 className="text-base font-semibold text-[#0F172A]">{w.title}</h3>
                <p className="mt-1 text-sm text-[#64748B] leading-snug">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A]">Real Results from Real Businesses</h2>
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
                  {[1,2,3,4,5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="text-[#0F172A] leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] grid place-items-center text-white text-sm font-semibold">
                    {t.name.split(" ").map(n => n[0]).join("")}
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

      {/* FAQ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A]">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="group rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 transition-colors">
                <summary className="list-none p-5 flex items-center justify-between cursor-pointer">
                  <span className="text-base font-semibold text-[#0F172A]">{f.q}</span>
                  <ChevronDown size={18} className="text-[#64748B] group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-[#64748B] text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="relative rounded-3xl p-10 sm:p-16 overflow-hidden text-white shadow-premium-lg" style={{ background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)" }}>
            <div className="absolute -top-20 -right-20 size-80 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-white/5" />
            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter leading-tight">Ready to Never Miss<br />Another Customer?</h2>
                <p className="mt-4 text-white/85 max-w-md">Deploy your AI agents in days, not months.</p>
                <ul className="mt-6 space-y-2">
                  {["Free Beta Access", "No credit card required", "Cancel anytime"].map((b) => (
                    <li key={b} className="flex items-center gap-2 text-white/90 text-sm"><CheckCircle2 size={16} /> {b}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => nav("/contact")} className="px-5 py-3 rounded-xl bg-white text-[#2563EB] font-semibold text-sm hover:bg-white/90 transition-colors" data-testid="cta-book-demo">Book a Demo</button>
                  <button onClick={() => nav("/signup")} className="px-5 py-3 rounded-xl border border-white/30 hover:bg-white/10 font-semibold text-sm transition-colors" data-testid="cta-start-free">Start Free</button>
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
