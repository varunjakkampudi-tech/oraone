import React from "react";
import { Phone, MessageCircle, MessageSquare, Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroOrb() {
  // Animated orb with channel icons floating around
  const channels = [
    { icon: MessageCircle, top: "8%", left: "50%", bg: "#22C55E", delay: 0 },
    { icon: Phone, top: "30%", left: "8%", bg: "#3B82F6", delay: 0.2 },
    { icon: MessageSquare, top: "30%", right: "8%", bg: "#06B6D4", delay: 0.4 },
    { icon: Mail, top: "75%", left: "12%", bg: "#F59E0B", delay: 0.6 },
    { icon: Calendar, top: "75%", right: "12%", bg: "#8B5CF6", delay: 0.8 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto">
      {/* Glow rings */}
      <div className="absolute inset-[15%] rounded-full" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)" }} />
      <div className="absolute inset-[25%] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0) 70%)" }} />

      {/* Concentric circles */}
      <svg className="absolute inset-0" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="170" stroke="rgba(37,99,235,0.08)" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="200" cy="200" r="135" stroke="rgba(37,99,235,0.12)" strokeWidth="1" />
        <circle cx="200" cy="200" r="100" stroke="rgba(37,99,235,0.15)" strokeWidth="1" strokeDasharray="2 4" />
      </svg>

      {/* Central orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="relative size-[180px] sm:size-[220px] rounded-full grid place-items-center"
          style={{
            background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
            boxShadow: "0 30px 80px -10px rgba(37,99,235,0.5), 0 0 0 1px rgba(255,255,255,0.4) inset",
          }}
        >
          <svg viewBox="0 0 24 24" width="80" height="80" fill="none">
            <path d="M12 3a9 9 0 1 0 9 9" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3.5" fill="white" />
          </svg>
        </div>
      </motion.div>

      {/* Audio wave bars - bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[8%] flex items-center gap-1.5">
        {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.4].map((h, i) => (
          <motion.span
            key={i}
            className="block rounded-full"
            style={{
              width: 3,
              background: "linear-gradient(180deg, #3B82F6, #06B6D4)",
            }}
            animate={{ height: [`${h * 12}px`, `${h * 32}px`, `${h * 12}px`] }}
            transition={{ duration: 1.2 + i * 0.05, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }}
          />
        ))}
      </div>

      {/* Listening badge */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-premium text-xs font-medium text-[#2563EB]">
          <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          AI Listening...
        </div>
      </div>

      {/* Floating channel icons */}
      {channels.map((c, i) => {
        const Icon = c.icon;
        const pos = { top: c.top, left: c.left, right: c.right };
        return (
          <motion.div
            key={i}
            className="absolute size-12 rounded-2xl bg-white grid place-items-center shadow-premium border border-[#E2E8F0]"
            style={pos}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
          >
            <Icon size={20} style={{ color: c.bg }} />
          </motion.div>
        );
      })}
    </div>
  );
}
