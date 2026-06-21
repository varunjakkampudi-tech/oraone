import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BRAND_MARK_URL } from "@/components/marketing/Logo";
import { MessageSquare, Users, ShieldCheck, Star } from "lucide-react";

/**
 * AuthLayout — dark, premium left panel + white right form panel.
 *
 * Left panel adapts to the active route (/login vs /signup):
 *   • Header: OraOne brand mark + wordmark + tagline
 *   • Headline with gradient (white + blue + violet)
 *   • Description
 *   • Signup-only: three feature cards (AI Platform, Built for Teams, Secure & Reliable)
 *   • 3D pedestal illustration using the official OraOne brand mark + floating chips
 *   • Trust strip: avatars + "Trusted by 10,000+ users worldwide" + 4.9/5 stars
 *
 * Right panel renders the matched route via <Outlet />.
 */
export default function AuthLayout() {
  const { pathname } = useLocation();
  const isSignup = pathname.startsWith("/signup");

  return (
    <div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] bg-[#05060E]"
      data-testid="auth-layout-root"
    >
      {/* ============================== LEFT (DARK) ============================== */}
      <aside className="relative hidden lg:flex flex-col px-12 xl:px-16 py-10 text-white overflow-hidden">
        {/* Cosmic background */}
        <Starfield />
        <div
          className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35), transparent 65%)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.32), transparent 65%)" }}
        />

        {/* Top: brand */}
        <Link to="/" className="relative z-10 flex items-center gap-3" data-testid="auth-brand-link">
          <img
            src={BRAND_MARK_URL}
            alt="OraOne"
            className="size-14 rounded-2xl object-cover"
            style={{ objectPosition: "center 22%" }}
            draggable="false"
          />
          <div className="leading-none">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-white">Ora</span>
              <span className="text-2xl font-extrabold tracking-tight text-[#60A5FA]">One</span>
            </div>
            <p className="mt-1.5 text-[11px] tracking-wider text-white/55">One AI. Every Conversation.</p>
          </div>
        </Link>

        {/* Headline + description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 mt-12"
        >
          {isSignup ? (
            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.1]">
              <span className="text-white">Create your account</span>
              <br />
              <span className="text-white">and </span>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#60A5FA,#A78BFA)" }}
              >
                unlock the power
              </span>
              <br />
              <span className="text-white">of </span>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#60A5FA,#A78BFA)" }}
              >
                AI conversations
              </span>
            </h1>
          ) : (
            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.1]">
              <span className="text-white">Welcome back</span>
              <br />
              <span className="text-white">to </span>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#60A5FA,#A78BFA)" }}
              >
                smarter
              </span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#60A5FA,#A78BFA)" }}
              >
                conversations
              </span>
            </h1>
          )}

          <p className="mt-6 text-[15px] leading-relaxed text-white/65 max-w-md">
            {isSignup ? (
              <>
                Join thousands of teams using OraOne to communicate smarter and get more done.
              </>
            ) : (
              <>
                Log in to continue where you left off and unlock the power of AI with{" "}
                <span className="text-[#A78BFA]">OraOne.</span>
              </>
            )}
          </p>
        </motion.div>

        {/* Signup-only feature cards */}
        {isSignup && (
          <div className="relative z-10 mt-8 space-y-3 max-w-md">
            {[
              {
                icon: MessageSquare,
                title: "All-in-one AI Platform",
                desc: "Chat, voice, and WhatsApp — all in one place.",
              },
              {
                icon: Users,
                title: "Built for Teams",
                desc: "Collaborate, manage, and scale effortlessly.",
              },
              {
                icon: ShieldCheck,
                title: "Secure & Reliable",
                desc: "Enterprise-grade security you can trust.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                className="flex items-start gap-4"
              >
                <div className="size-11 rounded-xl grid place-items-center shrink-0 bg-gradient-to-br from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] shadow-[0_8px_24px_-8px_rgba(99,102,241,0.55)]">
                  <f.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-white">{f.title}</p>
                  <p className="mt-0.5 text-[13px] text-white/55 leading-snug">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 3D pedestal illustration with floating accents */}
        <div className="relative z-10 mt-auto pb-6">
          <Pedestal />

          {/* Trust strip */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 14, 32, 47].map((id) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/64?img=${id}`}
                  alt=""
                  className="size-9 rounded-full border-2 border-[#05060E] object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <div>
              <p className="text-[13px] text-white/70 font-medium">
                Trusted by 10,000+ users worldwide
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} size={12} className="fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
                <span className="text-[12px] text-white/80 font-semibold">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ============================== RIGHT (FORM) ============================== */}
      <main className="relative flex flex-col bg-white">
        <div className="flex-1 flex items-start lg:items-center justify-center px-6 sm:px-10 lg:px-16 py-10 lg:py-14">
          <div className="w-full max-w-xl">
            {/* Mobile brand */}
            <Link to="/" className="lg:hidden mb-8 inline-flex items-center gap-2.5" data-testid="auth-brand-link-mobile">
              <img
                src={BRAND_MARK_URL}
                alt="OraOne"
                className="size-10 rounded-xl object-cover"
                style={{ objectPosition: "center 22%" }}
              />
              <span className="text-lg font-extrabold tracking-tight text-[#0F172A]">
                Ora<span className="text-[#2563EB]">One</span>
              </span>
            </Link>

            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

/* ============================ Decorative subcomponents ============================ */

function Starfield() {
  // Deterministic star positions for SSR stability
  const stars = [
    { l: 6, t: 12, s: 1 },   { l: 14, t: 32, s: 1.5 }, { l: 22, t: 8, s: 1 },
    { l: 36, t: 18, s: 1 },  { l: 48, t: 6, s: 1.5 },  { l: 58, t: 22, s: 1 },
    { l: 70, t: 14, s: 1 },  { l: 82, t: 28, s: 1.5 }, { l: 92, t: 10, s: 1 },
    { l: 8, t: 48, s: 1 },   { l: 26, t: 58, s: 1 },   { l: 44, t: 52, s: 1.5 },
    { l: 62, t: 64, s: 1 },  { l: 78, t: 56, s: 1 },   { l: 90, t: 70, s: 1.5 },
    { l: 12, t: 76, s: 1 },  { l: 34, t: 84, s: 1 },   { l: 56, t: 88, s: 1.5 },
    { l: 74, t: 80, s: 1 },  { l: 86, t: 92, s: 1 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/70"
          style={{
            left: `${p.l}%`,
            top: `${p.t}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            opacity: 0.35 + (i % 3) * 0.18,
            boxShadow: "0 0 6px rgba(255,255,255,0.6)",
          }}
        />
      ))}
      {/* Subtle vertical light streaks */}
      <div
        className="absolute left-[58%] top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(180deg, transparent, rgba(96,165,250,0.4), transparent)" }}
      />
      <div
        className="absolute left-[42%] top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(180deg, transparent, rgba(167,139,250,0.35), transparent)" }}
      />
    </div>
  );
}

function Pedestal() {
  return (
    <div className="relative h-56 xl:h-64">
      {/* Floating chips */}
      <div className="absolute left-2 top-4 size-11 rounded-xl grid place-items-center bg-gradient-to-br from-[#1E3A8A]/60 to-[#4C1D95]/60 border border-white/10 backdrop-blur-md float-anim">
        <Star size={16} className="text-[#FBBF24] fill-[#FBBF24]" />
      </div>
      <div
        className="absolute left-0 top-24 size-12 rounded-xl grid place-items-center bg-gradient-to-br from-[#1E3A8A]/60 to-[#4C1D95]/60 border border-white/10 backdrop-blur-md float-anim"
        style={{ animationDelay: "0.6s" }}
      >
        <MessageSquare size={18} className="text-[#A78BFA]" />
      </div>
      <div
        className="absolute right-8 top-6 size-11 rounded-xl grid place-items-center bg-gradient-to-br from-[#1E3A8A]/60 to-[#4C1D95]/60 border border-white/10 backdrop-blur-md float-anim"
        style={{ animationDelay: "1.1s" }}
      >
        {/* mini bar chart */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="13" width="3" height="8" rx="1" fill="#60A5FA" />
          <rect x="10" y="8" width="3" height="13" rx="1" fill="#60A5FA" />
          <rect x="17" y="4" width="3" height="17" rx="1" fill="#A78BFA" />
        </svg>
      </div>

      {/* Pedestal disc */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-56 h-10">
        <div
          className="absolute inset-x-0 bottom-0 h-8 rounded-[50%] blur-[2px]"
          style={{ background: "radial-gradient(ellipse at center, #6366F1 0%, rgba(99,102,241,0.0) 70%)" }}
        />
        <div
          className="absolute inset-x-6 bottom-2 h-5 rounded-[50%]"
          style={{ background: "linear-gradient(180deg,#312E81,#0B1130)" }}
        />
        <div
          className="absolute inset-x-3 bottom-5 h-2 rounded-[50%] opacity-80"
          style={{ background: "linear-gradient(90deg, #A78BFA, #60A5FA, #A78BFA)" }}
        />
      </div>

      {/* The big 3D card showcasing the OraOne brand mark */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-10">
        <div
          className="relative size-32 xl:size-36 rounded-3xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(59,130,246,0.6),0_10px_40px_-10px_rgba(124,58,237,0.45)]"
          style={{
            transform: "perspective(700px) rotateY(-14deg) rotateX(6deg)",
            background: "linear-gradient(135deg,#1D4ED8 0%,#3B82F6 40%,#60A5FA 100%)",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <img
            src={BRAND_MARK_URL}
            alt="OraOne mark"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 18%", transform: "scale(2.4)", transformOrigin: "center 32%" }}
            draggable="false"
          />
          {/* gloss */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 45%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
