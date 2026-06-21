import React from "react";
import { Phone, MessageCircle, MessageSquare, Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Hero Orb — asymmetric composition matching the OraOne reference design.
 *
 * Layout (within a square canvas, percentages relative to canvas):
 *   • Three concentric circles centered around 45% / 42% (slightly upper-left)
 *   • Central blue gradient orb is OFFSET to the bottom-right (~62% / 60%)
 *   • Channel icons orbit on/around the outer ring
 *   • Audio wave bars + "AI Listening..." pill sit below-left of the orb
 *   • Calendar icon overlaps the bottom-right edge of the orb
 */
export default function HeroOrb() {
  const orb = { cx: "50%", cy: "50%", size: "44%" }; // centered

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto select-none">
      {/* ---------- Concentric rings (centered) ---------- */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="ringFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#EFF6FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Outer light fill */}
        <circle cx="200" cy="200" r="155" fill="url(#ringFill)" />
        {/* Outer dashed ring */}
        <circle cx="200" cy="200" r="155" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 5" opacity="0.55" />
        {/* Middle solid faint ring */}
        <circle cx="200" cy="200" r="115" stroke="#CBD5E1" strokeWidth="1" opacity="0.45" />
        {/* Inner dashed ring */}
        <circle cx="200" cy="200" r="78" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
      </svg>

      {/* ---------- Floating channel icons (evenly around the centered ring) ---------- */}
      {/* WhatsApp / chat — top */}
      <FloatIcon top="5%" left="50%" color="#22C55E" delay={0}>
        <MessageCircle size={20} />
      </FloatIcon>
      {/* Phone — left */}
      <FloatIcon top="50%" left="5%" color="#2563EB" delay={0.2}>
        <Phone size={20} />
      </FloatIcon>
      {/* Message — right */}
      <FloatIcon top="50%" left="95%" color="#06B6D4" delay={0.4}>
        <MessageSquare size={20} />
      </FloatIcon>
      {/* Mail — bottom-left of ring */}
      <FloatIcon top="82%" left="20%" color="#F59E0B" delay={0.6}>
        <Mail size={20} />
      </FloatIcon>

      {/* ---------- Central orb (centered) ---------- */}
      <motion.div
        className="absolute"
        style={{
          left: orb.cx,
          top: orb.cy,
          width: orb.size,
          height: orb.size,
          transform: "translate(-50%, -50%)",
        }}
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Soft glow halo */}
        <div
          className="absolute inset-[-18%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(6,182,212,0.10) 40%, transparent 70%)",
          }}
        />
        <div
          className="relative w-full h-full rounded-full grid place-items-center"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #1E90F6 45%, #06B6D4 100%)",
            boxShadow:
              "0 32px 80px -12px rgba(37,99,235,0.55), inset 0 0 0 1px rgba(255,255,255,0.35), inset 0 -16px 40px rgba(15,23,42,0.18)",
          }}
        >
          {/* "C-with-dot" mark to echo the brand */}
          <svg viewBox="0 0 64 64" width="42%" height="42%" fill="none" aria-hidden="true">
            <path
              d="M48 32a16 16 0 1 1-6.4-12.8"
              stroke="white"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            <circle cx="32" cy="32" r="4.2" fill="white" />
          </svg>

          {/* Calendar icon overlapping bottom-right edge of orb */}
          <div className="absolute -bottom-3 -right-3">
            <div className="size-12 rounded-2xl bg-white grid place-items-center shadow-premium border border-[#E2E8F0]">
              <Calendar size={20} className="text-[#8B5CF6]" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ---------- Wave bars + AI listening pill (centered below orb) ---------- */}
      <div className="absolute" style={{ left: "50%", top: "85%", transform: "translate(-50%, -50%)" }}>
        <div className="flex items-end gap-[3px] h-8" aria-hidden="true">
          {[0.4, 0.7, 1, 0.55, 0.9, 0.5, 0.85, 0.4, 0.7, 0.45, 0.9, 0.55].map((h, i) => (
            <motion.span
              key={i}
              className="block rounded-full"
              style={{
                width: 3,
                background: "linear-gradient(180deg, #3B82F6, #06B6D4)",
              }}
              animate={{ height: [`${h * 40}%`, `${h * 100}%`, `${h * 40}%`] }}
              transition={{
                duration: 1 + (i % 4) * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.06,
              }}
            />
          ))}
        </div>
      </div>

      {/* AI Listening pill (centered, below the wave bars) */}
      <div className="absolute" style={{ left: "50%", top: "95%", transform: "translate(-50%, -50%)" }}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-premium text-xs font-medium text-[#2563EB] whitespace-nowrap">
          <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          AI Listening...
        </div>
      </div>
    </div>
  );
}

function FloatIcon({ top, left, color, delay, children }) {
  return (
    <motion.div
      className="absolute size-12 rounded-2xl bg-white grid place-items-center shadow-premium border border-[#E2E8F0]"
      style={{ top, left }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <span style={{ color }}>{children}</span>
    </motion.div>
  );
}
