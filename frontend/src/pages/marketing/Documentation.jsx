import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Code, Zap, ShieldCheck } from "lucide-react";
import { useSEO } from "@/lib/seo";

const sections = [
  { icon: BookOpen, title: "Getting Started", desc: "Set up your first AI agent in minutes." },
  { icon: Code, title: "API Reference", desc: "REST API documentation and code samples." },
  { icon: Zap, title: "Integrations", desc: "Connect with your existing tools." },
  { icon: ShieldCheck, title: "Security", desc: "How we protect your data." },
];

export default function DocumentationPage() {
  useSEO({ title: "Documentation", description: "OraOne developer documentation, guides and API reference." });
  return (
    <div>
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter text-[#0F172A]">Documentation</h1>
          <p className="mt-4 text-[#64748B] max-w-2xl mx-auto">Everything you need to build with OraOne.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-5">
          {sections.map((s, i) => (
            <motion.a key={s.title} href="#" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-7 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium transition-all">
              <div className="size-11 rounded-xl bg-[#EFF6FF] grid place-items-center mb-4">
                <s.icon size={20} className="text-[#2563EB]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A]">{s.title}</h3>
              <p className="mt-2 text-sm text-[#64748B]">{s.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}
