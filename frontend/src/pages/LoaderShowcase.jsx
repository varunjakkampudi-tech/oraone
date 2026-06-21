// LoaderShowcase.jsx — Internal showcase page used to capture screenshots of
// every loader variant in the OraOne Loader system. NOT exposed in production
// nav — accessible only at /__loaders for QA/screenshot purposes.

import React from "react";
import OraOneLoader, {
  ButtonSpinner,
  InlineLoader,
  DotsLoader,
  ChatTyping,
  Skeleton,
  CardSkeleton,
  TableSkeleton,
  EmptyStateLoader,
  ProgressStages,
  TopProgressBar,
  PageTransition,
} from "@/components/ui/OraOneLoader";
import { BRAND_MARK_URL } from "@/components/marketing/Logo";

export default function LoaderShowcase() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 space-y-10" data-testid="loader-showcase">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-[#0F172A]">OraOne Loader System</h1>
        <p className="mt-1 text-[#64748B]">Every loader variant rendered side-by-side for QA / docs.</p>
      </header>

      {/* Full-page Loader (light) */}
      <Section title="01 · Full Page Loader (Light)">
        <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden h-[440px]">
          <OraOneLoader label="Loading your workspace…" fullScreen={false} />
        </div>
      </Section>

      {/* Full-page Loader (dark) */}
      <Section title="02 · Full Page Loader (Dark)">
        <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden h-[440px]">
          <OraOneLoader label="Loading your workspace…" fullScreen={false} dark />
        </div>
      </Section>

      {/* Button + Inline + Dots */}
      <Section title="03 · Button / Inline / Dots Loaders">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 flex items-center justify-center gap-4">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-sm font-semibold">
              <ButtonSpinner /> Loading…
            </button>
            <button disabled className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E2E8F0] text-[#94A3B8] text-sm font-semibold opacity-70">
              <ButtonSpinner /> Loading…
            </button>
          </div>
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 flex items-center justify-center">
            <InlineLoader label="Loading data…" />
          </div>
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 flex items-center justify-center">
            <DotsLoader label="Fetching details…" />
          </div>
        </div>
      </Section>

      {/* Chat Typing */}
      <Section title="04 · Chat Typing Loader">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
          <ChatTyping />
        </div>
      </Section>

      {/* Skeletons */}
      <Section title="05 · Skeleton Loaders (Card + Table)">
        <div className="grid lg:grid-cols-2 gap-4">
          <CardSkeleton rows={4} />
          <TableSkeleton rows={5} cols={4} />
        </div>
      </Section>

      {/* Empty State Loader */}
      <Section title="06 · Empty State Loader">
        <EmptyStateLoader />
      </Section>

      {/* Progress Stages */}
      <Section title="07 · Progress Stages Loader">
        <ProgressStages current={2} />
      </Section>

      {/* Top progress bar */}
      <Section title="08 · Top Progress Bar (Global Loading)">
        <div className="relative rounded-2xl border border-[#E2E8F0] bg-white p-6 h-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0">
            <TopProgressBar active label="Preparing your experience…" />
          </div>
          <p className="mt-6 text-center text-[12px] text-[#64748B]">Top progress bar rendered inline for screenshot purposes.</p>
        </div>
      </Section>

      {/* Page Transition */}
      <Section title="09 · Page Transition (Soft Loader)">
        <div className="relative rounded-2xl border border-[#E2E8F0] overflow-hidden h-[280px] bg-white/85 backdrop-blur-sm grid place-items-center">
          {/* Inlined version of PageTransition body so it doesn't fixed-overlay the showcase */}
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
            <div className="relative size-16 rounded-2xl overflow-hidden bg-[#0F172A] shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)]">
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
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-[12px] font-bold tracking-[0.25em] text-[#2563EB] mb-3">{title}</h2>
      {children}
    </section>
  );
}
