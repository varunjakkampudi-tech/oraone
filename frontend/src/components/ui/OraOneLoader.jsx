import React from "react";
import { BRAND_MARK_URL } from "@/components/marketing/Logo";

/**
 * OraOne branded loader — used as the global Suspense fallback while
 * lazy-loaded routes are being fetched.
 *
 *   • Brand mark sits on a soft animated halo
 *   • Cyan→indigo orbit ring rotates around it
 *   • "Loading…" text is screen-reader friendly (aria-live="polite")
 */
export default function OraOneLoader({ label = "Loading…" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-6"
      data-testid="oraone-loader"
    >
      <div className="relative size-24">
        {/* Halo pulse */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full animate-ping-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)",
          }}
        />
        {/* Spinning orbit ring */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animationDuration: "2.4s" }}
          viewBox="0 0 100 100"
          fill="none"
        >
          <defs>
            <linearGradient id="oo-loader-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="60%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#oo-loader-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="180 100"
          />
        </svg>
        {/* Brand mark in the centre */}
        <div className="absolute inset-2 rounded-2xl overflow-hidden bg-[#0F172A] shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)]">
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

      <div className="text-center">
        <p className="text-sm font-semibold text-[#0F172A] tracking-tight">
          Ora<span className="text-[#2563EB]">One</span>
        </p>
        <p className="mt-1 text-xs text-[#64748B]">{label}</p>
      </div>
    </div>
  );
}
