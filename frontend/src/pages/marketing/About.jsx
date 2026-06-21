import React from "react";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";

export default function AboutPage() {
  useSEO({ title: "About Us", description: "OraOne is on a mission to bring human-like AI to every customer conversation." });
  return (
    <div>
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter text-[#0F172A]">Building the future of conversations</h1>
          <p className="mt-6 text-lg text-[#64748B] leading-relaxed">OraOne is on a mission to give every business an AI workforce — one that answers calls, replies on chat, automates WhatsApp, and never misses a lead.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[
            { stat: "10,000+", label: "Businesses served" },
            { stat: "50M+", label: "Conversations handled" },
            { stat: "25+", label: "Countries" },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white border border-[#E2E8F0] text-center">
              <p className="text-5xl font-black tracking-tighter text-[#2563EB]">{s.stat}</p>
              <p className="mt-2 text-sm text-[#64748B]">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Our values</h2>
          <p className="mt-4 text-[#64748B]">Customer-obsessed. Engineering-first. Honest pricing. Privacy by design.</p>
        </div>
      </section>
    </div>
  );
}
