import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, Home, GraduationCap, ShieldCheck, Car, Wallet, ShoppingBag, Hotel } from "lucide-react";
import { useSEO } from "@/lib/seo";

const solutions = [
  { name: "Healthcare", desc: "Patient support, appointment scheduling & reminders.", icon: Stethoscope, color: "#3B82F6" },
  { name: "Real Estate", desc: "Lead qualification, site visits & follow-ups.", icon: Home, color: "#22C55E" },
  { name: "Education", desc: "Admissions, inquiries and student support.", icon: GraduationCap, color: "#06B6D4" },
  { name: "Insurance", desc: "Policy support, claims and renewals.", icon: ShieldCheck, color: "#8B5CF6" },
  { name: "Finance", desc: "Customer onboarding, KYC and support.", icon: Wallet, color: "#F59E0B" },
  { name: "Retail", desc: "Order tracking, returns and support.", icon: ShoppingBag, color: "#EF4444" },
  { name: "Hospitality", desc: "Reservations, support and guest services.", icon: Hotel, color: "#EC4899" },
  { name: "Automotive", desc: "Service bookings, reminders and support.", icon: Car, color: "#0EA5E9" },
];

export default function SolutionsPage() {
  useSEO({ title: "Solutions", description: "AI agent solutions for every industry — healthcare, real estate, education, insurance and more." });
  return (
    <div>
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter text-[#0F172A]">Solutions for Every Industry</h1>
          <p className="mt-4 text-[#64748B] max-w-2xl mx-auto">Tailored AI solutions for your business needs.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/30 hover:shadow-premium transition-all"
              >
                <div className="size-12 rounded-xl grid place-items-center mb-4" style={{ background: `${s.color}15` }}>
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A]">{s.name}</h3>
                <p className="mt-2 text-sm text-[#64748B] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
