import React from "react";

// Official OraOne logo asset
export const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_ora-one-v1/artifacts/7qrvj8gv_image.png";

/**
 * OraOne Logo
 * - Default (light surfaces): uses the official logo image (mark only)
 * - light prop (dark surfaces): renders the same mark + white "OraOne" wordmark + tagline
 * - size controls the icon mark width/height (px)
 */
export function Logo({ size = 36, light = false, showText = true, className = "" }) {
  const textColor = light ? "text-white" : "text-[#0F172A]";
  const subColor = light ? "text-white/65" : "text-[#64748B]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Mark: cropped from the logo asset using object-fit positioning to show only the icon */}
      <div
        className={`flex-shrink-0 overflow-hidden rounded-xl ${light ? "bg-white p-0.5 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.4)]" : ""}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <img
          src={LOGO_URL}
          alt=""
          draggable="false"
          // The provided asset is square with the mark in the top ~55% and text below.
          // We crop to the mark by scaling up and shifting via objectPosition.
          style={{
            width: "180%",
            height: "180%",
            objectFit: "cover",
            objectPosition: "center 22%",
            transform: "translateY(-2%)",
            display: "block",
            borderRadius: light ? "0.625rem" : 0,
          }}
        />
      </div>

      {showText && (
        <div className="leading-tight">
          <div className={`text-lg font-bold tracking-tight ${textColor}`}>
            <span>Ora</span>
            <span className={light ? "text-white" : "gradient-text"}>One</span>
          </div>
          <div className={`text-[10px] tracking-wider ${subColor}`}>One AI. Every Conversation.</div>
        </div>
      )}
    </div>
  );
}
