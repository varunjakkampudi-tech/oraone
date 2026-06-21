import React from "react";

export function Logo({ size = 32, light = false, className = "" }) {
  const textColor = light ? "text-white" : "text-[#0F172A]";
  const subColor = light ? "text-white/60" : "text-[#64748B]";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="relative grid place-items-center rounded-xl"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
          boxShadow: "0 6px 16px -4px rgba(37,99,235,0.45)",
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none">
          <path d="M12 3a9 9 0 1 0 9 9" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="white" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={`text-lg font-bold tracking-tight ${textColor}`}>OraOne</div>
        <div className={`text-[10px] tracking-wider ${subColor}`}>One AI. Every Conversation.</div>
      </div>
    </div>
  );
}
