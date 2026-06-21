import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { api, formatApiError } from "@/lib/api";
import { toast } from "sonner";
import { useSEO } from "@/lib/seo";

export default function ContactPage() {
  useSEO({ title: "Contact Sales", description: "Book a demo or get in touch with the OraOne sales team." });
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", type: "demo" });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/contact", form);
      toast.success("Thanks! Our team will be in touch within 24 hours.");
      setForm({ name: "", email: "", company: "", message: "", type: "demo" });
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Failed to submit");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="py-20 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#0F172A]">Let's talk</h1>
          <p className="mt-4 text-[#64748B] leading-relaxed">Book a personalized demo with our team or send us a message. We typically respond within 24 hours.</p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-[#EFF6FF] grid place-items-center"><Mail size={18} className="text-[#2563EB]" /></div>
              <div>
                <p className="text-xs text-[#64748B]">Email</p>
                <p className="text-sm font-medium text-[#0F172A]">sales@oraone.ai</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-[#EFF6FF] grid place-items-center"><Phone size={18} className="text-[#2563EB]" /></div>
              <div>
                <p className="text-xs text-[#64748B]">Phone</p>
                <p className="text-sm font-medium text-[#0F172A]">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-[#EFF6FF] grid place-items-center"><MapPin size={18} className="text-[#2563EB]" /></div>
              <div>
                <p className="text-xs text-[#64748B]">Office</p>
                <p className="text-sm font-medium text-[#0F172A]">Mumbai, India</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={submit} className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-premium">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Full Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10" data-testid="contact-name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Work Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10" data-testid="contact-email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Company</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10" data-testid="contact-company" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">How can we help?</label>
              <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10" data-testid="contact-message" />
            </div>
            <button type="submit" disabled={busy} data-testid="contact-submit" className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-colors disabled:opacity-60">
              {busy ? "Sending..." : "Book a Demo"}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
