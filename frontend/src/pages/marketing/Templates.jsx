import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TEMPLATES } from "@/lib/mockData";
import { Stethoscope, Home, Car, ShieldCheck, Hotel, Users } from "lucide-react";
import { useSEO } from "@/lib/seo";

const icons = { Stethoscope, Home, Car, ShieldCheck, Hotel, Users };

export default function TemplatesPage() {
  useSEO({ title: "Templates", description: "Quick-start with pre-built AI agent templates for your business." });
  return (
    <div>
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter text-[#0F172A]">AI Agent Templates</h1>
          <p className="mt-4 text-[#64748B] max-w-2xl mx-auto">Quick-start with pre-built templates for your business.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TEMPLATES.map((t, i) => {
              const Icon = icons[t.icon] || Users;
              return (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium transition-all flex items-center gap-5"
                >
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 grid place-items-center flex-shrink-0">
                    <Icon size={22} className="text-[#2563EB]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-[#0F172A]">{t.name}</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB]">{t.type}</span>
                    </div>
                    <p className="mt-1 text-sm text-[#64748B]">{t.desc}</p>
                  </div>
                  <Link to="/signup" className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium whitespace-nowrap" data-testid={`template-use-${t.name.replace(/\s+/g, "-").toLowerCase()}`}>Use Template</Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
