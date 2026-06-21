import React from "react";

// Official OraOne brand mark — the latest brand asset (dark-background version)
export const BRAND_MARK_URL =
  "https://customer-assets.emergentagent.com/job_ora-one-v1/artifacts/jozmlir6_ChatGPT%20Image%20Jun%2021%2C%202026%2C%2009_07_48%20PM.png";

/**
 * OraOne brand mark only (icon, no wordmark).
 *
 * The supplied asset has a black background, so we render it inside a small
 * dark-navy rounded tile — turning the dark backdrop into a deliberate premium
 * "badge" treatment that reads cleanly on both light and dark surfaces.
 */
export function BrandMark({ size = 36, className = "" }) {
  return (
    <div
      className={`flex-shrink-0 overflow-hidden rounded-xl bg-[#0F172A] shadow-[0_4px_14px_-4px_rgba(15,23,42,0.35)] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img
        src={BRAND_MARK_URL}
        alt=""
        draggable="false"
        style={{
          width: "180%",
          height: "180%",
          objectFit: "cover",
          objectPosition: "center 22%",
          display: "block",
        }}
      />
    </div>
  );
}

/**
 * OraOne Logo — brand-mark tile + "Ora One" wordmark + tagline.
 *
 * - `light=true` switches the wordmark/tagline text to white (for dark surfaces).
 * - `size` controls the brand-mark tile size in px.
 * - `showText={false}` renders just the mark tile.
 */
export function Logo({ size = 36, light = false, showText = true, className = "" }) {
  const oraColor = light ? "text-white" : "text-[#0F172A]";
  const oneColor = light ? "text-[#7DD3FC]" : "text-[#2563EB]";
  const subColor = light ? "text-white/55" : "text-[#64748B]";
  const tagDash = light ? "bg-white/40" : "bg-[#2563EB]/40";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <BrandMark size={size} />

      {showText && (
        <div className="leading-none">
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-extrabold tracking-tight ${oraColor}`}>Ora</span>
            <span className={`text-xl font-extrabold tracking-tight ${oneColor}`}>One</span>
          </div>
          <div className={`mt-1 flex items-center gap-1.5 text-[9px] tracking-wider ${subColor}`}>
            <span className={`block h-px w-2 ${tagDash}`} />
            <span>One AI. Every Conversation.</span>
            <span className={`block h-px w-2 ${tagDash}`} />
          </div>
        </div>
      )}
    </div>
  );
}
