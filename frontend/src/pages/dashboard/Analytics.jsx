import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { Calendar, TrendingUp, Users, Phone } from "lucide-react";
import { CONVERSATION_SUMMARY } from "@/lib/mockData";

const CHANNEL_PERF = [
  { name: "Voice", value: 76 },
  { name: "Chat", value: 84 },
  { name: "WhatsApp", value: 92 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Analytics</h2>
          <p className="text-sm text-[#64748B] mt-0.5">Deep insights into your AI agent performance.</p>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-sm inline-flex items-center gap-2 text-[#475569]">
            <Calendar size={14} /> Custom Range
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Conversations", value: "5,490", trend: "+18.2%", icon: TrendingUp },
          { label: "Total Leads", value: "689", trend: "+25.3%", icon: Users },
          { label: "Conversion Rate", value: "24.5%", trend: "+3.1%", icon: TrendingUp },
          { label: "Missed Calls Saved", value: "318", trend: "+12%", icon: Phone },
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="p-5 rounded-2xl bg-white border border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#64748B]">{k.label}</p>
              <k.icon size={14} className="text-[#94A3B8]" />
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A]">{k.value}</p>
            <p className="mt-1 text-xs text-green-600 font-medium">{k.trend}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-[#E2E8F0]">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">Conversations Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={CONVERSATION_SUMMARY} margin={{ left: -16, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="name" fontSize={11} stroke="#94A3B8" tickLine={false} axisLine={false} />
                <YAxis fontSize={11} stroke="#94A3B8" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line dataKey="Calls" stroke="#7C3AED" strokeWidth={2.5} dot={false} />
                <Line dataKey="Chats" stroke="#22C55E" strokeWidth={2.5} dot={false} />
                <Line dataKey="WhatsApp" stroke="#F59E0B" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0]">
          <h3 className="text-base font-semibold text-[#0F172A] mb-4">Channel Performance</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={CHANNEL_PERF} margin={{ left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="name" fontSize={11} stroke="#94A3B8" tickLine={false} axisLine={false} />
                <YAxis fontSize={11} stroke="#94A3B8" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
                <Bar dataKey="value" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
