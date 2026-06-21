import React, { useEffect, useState } from "react";
import { BRAND_MARK_URL } from "@/components/marketing/Logo";

/* ────────────────────────────────────────────────────────────────── */
/*  Shared brand mark with halo + orbit                               */
/* ────────────────────────────────────────────────────────────────── */
function BrandHalo({ size = 96, dark = false }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* halo glow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full animate-ping-slow"
        style={{
          background: dark
            ? "radial-gradient(circle, rgba(96,165,250,0.45) 0%, rgba(96,165,250,0) 70%)"
            : "radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(37,99,235,0) 70%)",
        }}
      />
      {/* orbit ring */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full animate-spin"
        style={{ animationDuration: "2.4s" }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <defs>
          <linearGradient id={`oo-orbit-${dark ? "d" : "l"}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={dark ? "#60A5FA" : "#2563EB"} />
            <stop offset="60%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor={dark ? "#60A5FA" : "#2563EB"} stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke={`url(#oo-orbit-${dark ? "d" : "l"})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="180 100"
        />
      </svg>
      {/* concentric particle dots */}
      <Particles dark={dark} />
      {/* brand mark */}
      <div
        className="absolute rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)]"
        style={{
          inset: size * 0.12,
          background: "#0F172A",
        }}
      >
        <img
          src={BRAND_MARK_URL}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 18%", transform: "scale(1.8)", transformOrigin: "center 32%" }}
        />
      </div>
    </div>
  );
}

function Particles({ dark }) {
  const dots = [
    { top: "8%", left: "20%", color: "#2563EB" },
    { top: "18%", right: "10%", color: "#7C3AED" },
    { bottom: "12%", left: "8%", color: "#16A34A" },
    { bottom: "20%", right: "14%", color: "#F59E0B" },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute size-1.5 rounded-full"
          style={{ ...d, background: dark ? "#60A5FA" : d.color, opacity: 0.7 }}
        />
      ))}
    </>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Full Page Loader — used as global Suspense fallback (LIGHT)       */
/* ────────────────────────────────────────────────────────────────── */
export default function OraOneLoader({ label = "Loading your workspace…", fullScreen = true, dark = false }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      data-testid="oraone-loader"
      className={`${fullScreen ? "min-h-screen" : "min-h-[60vh]"} flex flex-col items-center justify-center gap-7 px-6 ${
        dark ? "bg-[#0B1220] text-white" : "bg-white text-[#0F172A]"
      }`}
    >
      <BrandHalo size={104} dark={dark} />
      <div className="text-center">
        <p className={`text-xl font-black tracking-tight ${dark ? "text-white" : "text-[#0F172A]"}`}>
          Ora<span className="text-[#2563EB]">One</span>
        </p>
        <p className={`mt-1 text-[12px] ${dark ? "text-white/60" : "text-[#64748B]"}`}>
          One AI. Every Conversation.
        </p>
      </div>
      {/* progress bar */}
      <div className={`w-64 h-1.5 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-[#F1F5F9]"}`}>
        <div className="h-full rounded-full loader-progress" />
      </div>
      <p className={`text-[12.5px] ${dark ? "text-white/70" : "text-[#475569]"}`}>{label}</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Button Loader — inline spinner                                    */
/* ────────────────────────────────────────────────────────────────── */
export function ButtonSpinner({ size = 14, className = "" }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Inline Loader — small card with text                              */
/* ────────────────────────────────────────────────────────────────── */
export function InlineLoader({ label = "Loading data…", className = "" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="inline-loader"
      className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-[#E2E8F0] shadow-sm ${className}`}
    >
      <ButtonSpinner size={14} className="text-[#2563EB]" />
      <span className="text-[13px] font-medium text-[#0F172A]">{label}</span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Dots loader (bouncing dots)                                       */
/* ────────────────────────────────────────────────────────────────── */
export function DotsLoader({ label, className = "" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="dots-loader"
      className={`flex flex-col items-center gap-2 ${className}`}
    >
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2 rounded-full bg-[#2563EB] dot-bounce"
            style={{ animationDelay: `${i * 0.15}s`, opacity: 1 - i * 0.25 }}
          />
        ))}
      </div>
      {label && <p className="text-[12.5px] text-[#475569] mt-1">{label}</p>}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Chat Typing Loader (OraOne is typing…)                            */
/* ────────────────────────────────────────────────────────────────── */
export function ChatTyping({ label = "OraOne is typing…" }) {
  return (
    <div className="flex items-center gap-3" data-testid="chat-typing">
      <span className="size-9 rounded-full bg-[#0F172A] overflow-hidden grid place-items-center flex-shrink-0">
        <img
          src={BRAND_MARK_URL}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 18%", transform: "scale(1.8)", transformOrigin: "center 32%" }}
        />
      </span>
      <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-[#F1F5F9] flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-[#2563EB] dot-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      {label && <span className="text-[12px] text-[#64748B]">{label}</span>}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Skeleton primitives                                               */
/* ────────────────────────────────────────────────────────────────── */
export function Skeleton({ className = "", style }) {
  return <div className={`skeleton rounded-lg ${className}`} style={style} aria-hidden="true" />;
}

export function CardSkeleton({ rows = 3 }) {
  return (
    <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-white space-y-3" data-testid="card-skeleton">
      <div className="flex items-center gap-3">
        <Skeleton className="size-9 rounded-xl" />
        <Skeleton className="h-3 w-32" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-2.5 w-full" style={{ width: `${80 - i * 12}%` }} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden" data-testid="table-skeleton">
      <div className="px-5 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
        <Skeleton className="h-3 w-32" />
      </div>
      <div className="divide-y divide-[#E2E8F0]">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="px-5 py-4 flex items-center gap-4">
            <Skeleton className="size-9 rounded-full" />
            {Array.from({ length: cols - 1 }).map((__, c) => (
              <Skeleton key={c} className="h-2.5 flex-1" style={{ maxWidth: `${120 + c * 30}px` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Empty State With Loader                                            */
/* ────────────────────────────────────────────────────────────────── */
export function EmptyStateLoader({
  label = "Loading your data…",
  sub = "Please wait a moment while we fetch everything for you.",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="empty-state-loader"
      className="rounded-2xl border border-[#E2E8F0] bg-white p-10 flex flex-col items-center text-center"
    >
      <BrandHalo size={72} />
      <p className="mt-5 text-lg font-bold text-[#0F172A]">{label}</p>
      <p className="mt-1 text-[13px] text-[#64748B] max-w-sm">{sub}</p>
      <div className="mt-4">
        <DotsLoader />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Progress Stages Loader (Connecting → … → Almost Done)             */
/* ────────────────────────────────────────────────────────────────── */
export function ProgressStages({ stages, current = 0 }) {
  const list = stages || ["Connecting", "Fetching Data", "Processing", "Almost Done"];
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6" data-testid="progress-stages">
      <div className="flex items-center justify-between gap-2">
        {list.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center min-w-[70px]">
                <span
                  className={`size-9 rounded-full grid place-items-center text-[12px] font-bold transition-all ${
                    done
                      ? "bg-[#2563EB] text-white"
                      : active
                      ? "bg-white border-2 border-[#2563EB] text-[#2563EB] ring-4 ring-[#2563EB]/15"
                      : "bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]"
                  }`}
                >
                  {i + 1}
                </span>
                <p
                  className={`mt-2 text-[11.5px] font-semibold ${
                    done || active ? "text-[#2563EB]" : "text-[#94A3B8]"
                  }`}
                >
                  {s}
                </p>
              </div>
              {i < list.length - 1 && (
                <span
                  className={`flex-1 h-[2px] rounded-full ${
                    i < current ? "bg-[#2563EB]" : "border-t-2 border-dashed border-[#E2E8F0]"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Top Progress Bar — thin global loader                              */
/* ────────────────────────────────────────────────────────────────── */
export function TopProgressBar({ active = true, label }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    setProgress(10);
    const id = setInterval(() => {
      setProgress((p) => (p < 85 ? p + (Math.random() * 12 + 3) : p));
    }, 220);
    return () => {
      clearInterval(id);
      setProgress(100);
    };
  }, [active]);

  if (!active) return null;
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      data-testid="top-progress-bar"
    >
      <div className="h-[3px] w-full bg-[#EFF6FF]">
        <div
          className="h-full bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#2563EB] transition-all duration-300 shadow-[0_0_8px_rgba(37,99,235,0.6)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      {label && (
        <p className="text-center text-[11px] text-[#64748B] mt-1 font-medium">{label}</p>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */
/*  Page Transition / Soft Loader — concentric ripple                  */
/* ────────────────────────────────────────────────────────────────── */
export function PageTransition() {
  return (
    <div
      className="fixed inset-0 z-[200] bg-white/85 backdrop-blur-sm grid place-items-center"
      data-testid="page-transition"
    >
      <div className="relative">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className="absolute rounded-full border border-[#2563EB]/40 animate-ping-slow"
            style={{
              top: -16 * n,
              left: -16 * n,
              width: 56 + 32 * n,
              height: 56 + 32 * n,
              animationDelay: `${n * 0.25}s`,
            }}
          />
        ))}
        <BrandHalo size={64} />
      </div>
    </div>
  );
}
