import React, { useState } from "react";
import { motion } from "framer-motion";
import { INTEGRATIONS } from "@/lib/mockData";
import { useSEO } from "@/lib/seo";

const categories = ["All", "CRM", "Calendar", "Communication", "Productivity", "Other"];

export default function IntegrationsPage() {
  const [active, setActive] = useState("All");
  useSEO({ title: "Integrations", description: "Connect OraOne with Salesforce, HubSpot, Zoho, Google Calendar, Slack and more." });
  const list = active === "All" ? INTEGRATIONS : INTEGRATIONS.filter((i) => i.category === active);
  return (
    <div>
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter text-[#0F172A]">Integrate with Your Favorite Tools</h1>
          <p className="mt-4 text-[#64748B] max-w-2xl mx-auto">Connect OraOne with tools you already use.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                data-testid={`integrations-filter-${c.toLowerCase()}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  active === c ? "bg-[#2563EB] text-white" : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F1F5F9]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {list.map((i, idx) => (
              <motion.div
                key={i.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium transition-all"
              >
                <div className="size-12 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 grid place-items-center mb-3">
                  <span className="text-lg font-bold text-[#2563EB]">{i.name.slice(0, 1)}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#0F172A]">{i.name}</h3>
                <p className="mt-1 text-xs text-[#64748B]">{i.category}</p>
                <p className="mt-2 text-xs text-[#475569] leading-snug">{i.desc}</p>
                <button className="mt-4 text-xs font-semibold text-[#2563EB] hover:underline" data-testid={`integration-connect-${i.slug}`}>Connect →</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
