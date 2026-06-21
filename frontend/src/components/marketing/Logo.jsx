import React from "react";

// Official OraOne brand mark — sourced from the brand asset
export const BRAND_MARK_URL =
  "https://customer-assets.emergentagent.com/job_ora-one-v1/artifacts/7qrvj8gv_image.png";

/**
 * OraOne brand mark only (no wordmark).
 * Crops the supplied logo asset to show ONLY the icon portion (top ~55%).
 *
 * `light=true` wraps the mark in a white rounded tile so it stays visible on dark surfaces.
 */
export function BrandMark({ size = 36, light = false, className = "" }) {
  return (
    <div
      className={`flex-shrink-0 overflow-hidden rounded-xl ${light ? "bg-white p-0.5 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.4)]" : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img
        src={BRAND_MARK_URL}
        alt=""
        draggable="false"
        style={{
          width: "170%",
          height: "170%",
          objectFit: "cover",
          objectPosition: "center 18%",
          display: "block",
          borderRadius: light ? "0.625rem" : 0,
        }}
      />
    </div>
  );
}

/**
 * OraOne Logo — mark + "Ora One" wordmark + tagline.
 *
 * - `light=true` switches wordmark/tagline to white for dark surfaces.
 * - `size` controls the mark size in px.
 * - `showText={false}` renders just the mark.
 */
export function Logo({ size = 36, light = false, showText = true, className = "" }) {
  const oraColor = light ? "text-white" : "text-[#0F172A]";
  const oneColor = light ? "text-[#7DD3FC]" : "text-[#2563EB]";
  const subColor = light ? "text-white/55" : "text-[#64748B]";
  const tagDash = light ? "bg-white/40" : "bg-[#2563EB]/40";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <BrandMark size={size} light={light} />

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
