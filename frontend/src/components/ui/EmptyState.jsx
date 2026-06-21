import React from "react";
import { Inbox } from "lucide-react";

/**
 * EmptyState — reusable branded empty-state block.
 * Props:
 *  - icon: lucide-react component (defaults to Inbox)
 *  - title, description: text content
 *  - actionLabel, onAction: primary CTA
 *  - tone: 'blue' | 'violet' | 'green' | 'amber' (icon tint)
 */
const TONES = {
  blue:   { bg: "#EFF6FF", fg: "#2563EB" },
  violet: { bg: "#F5F3FF", fg: "#7C3AED" },
  green:  { bg: "#ECFDF5", fg: "#16A34A" },
  amber:  { bg: "#FEF3C7", fg: "#D97706" },
};

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  tone = "blue",
  className = "",
  testId = "empty-state",
}) {
  const t = TONES[tone] || TONES.blue;
  return (
    <div
      className={`text-center px-6 py-12 rounded-2xl bg-white border border-dashed border-[#E2E8F0] ${className}`}
      role="status"
      aria-live="polite"
      data-testid={testId}
    >
      <div
        className="mx-auto size-14 rounded-2xl grid place-items-center"
        style={{ background: t.bg }}
      >
        <Icon size={22} style={{ color: t.fg }} aria-hidden="true" />
      </div>
      {title && (
        <h3 className="mt-4 text-base font-semibold text-[#0F172A]">{title}</h3>
      )}
      {description && (
        <p className="mt-1.5 text-sm text-[#64748B] max-w-sm mx-auto">{description}</p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors"
          data-testid={`${testId}-action`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
