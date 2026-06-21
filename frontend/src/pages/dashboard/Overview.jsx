import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, MessageSquare, MessageCircle, Users, Calendar,
  ArrowUpRight, MoreHorizontal,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend,
} from "recharts";
import { CONVERSATION_SUMMARY, TOP_AGENTS, LEAD_SOURCES, RECENT_CONVERSATIONS } from "@/lib/mockData";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

const KPI_ICONS = { calls_answered: Phone, chats_handled: MessageSquare, whatsapp_chats: MessageCircle, leads_captured: Users, appointments: Calendar };

const KPI_CARDS = [
  { key: "calls_answered", label: "Calls Answered", value: 1246, delta: "+18.5%", icon: Phone, tone: "#2563EB" },
  { key: "chats_handled", label: "Chats Handled", value: 2354, delta: "+22.1%", icon: MessageSquare, tone: "#7C3AED" },
  { key: "whatsapp_chats", label: "WhatsApp Chats", value: 1890, delta: "+16.7%", icon: MessageCircle, tone: "#22C55E" },
  { key: "leads_captured", label: "Leads Captured", value: 689, delta: "+25.3%", icon: Users, tone: "#0EA5E9" },
  { key: "appointments", label: "Appointments Booked", value: 342, delta: "+20.8%", icon: Calendar, tone: "#F59E0B" },
];

const STATUS_COLORS = {
  Completed: "bg-green-50 text-green-700 border-green-200",
  Qualified: "bg-blue-50 text-blue-700 border-blue-200",
  "Appointment Booked": "bg-purple-50 text-purple-700 border-purple-200",
  Missed: "bg-red-50 text-red-700 border-red-200",
};

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/overview").then((r) => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Hello, {user?.full_name?.split(" ")[0] || "there"} 👋</h2>
          <p className="text-sm text-[#64748B] mt-0.5">Here's what's happening with your AI agents today.</p>
        </div>
        <div className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-sm text-[#475569] inline-flex items-center gap-2">
          <Calendar size={14} /> May 20 — May 26, 2024
        </div>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {KPI_CARDS.map((k, i) => {
          const Icon = k.icon;
          const live = stats?.[k.key] ?? k.value;
          return (
            <motion.div
              key={k.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:shadow-premium transition-all"
              data-testid={`kpi-${k.key}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#64748B]">{k.label}</p>
                  <p className="mt-1.5 text-2xl font-bold tracking-tight text-[#0F172A]">{Number(live).toLocaleString()}</p>
                </div>
                <div className="size-9 rounded-xl grid place-items-center" style={{ background: `${k.tone}15` }}>
                  <Icon size={16} style={{ color: k.tone }} />
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                <ArrowUpRight size={12} /> {k.delta}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 p-6 rounded-2xl bg-white border border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-[#0F172A]">Conversation Summary</h3>
              <p className="text-xs text-[#64748B] mt-0.5">Last 7 days</p>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9]" aria-label="More"><MoreHorizontal size={16} className="text-[#64748B]" /></button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CONVERSATION_SUMMARY} margin={{ left: -16, right: 8, top: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
                <Line type="monotone" dataKey="Calls" stroke="#7C3AED" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="Chats" stroke="#22C55E" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="WhatsApp" stroke="#F59E0B" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-white border border-[#E2E8F0]">
          <h3 className="text-base font-semibold text-[#0F172A]">Top Performing Agents</h3>
          <div className="mt-5 space-y-4">
            {TOP_AGENTS.map((a) => (
              <div key={a.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: a.color }} />
                    <span className="text-sm font-medium text-[#0F172A]">{a.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A]">{a.success}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${a.success}%`, background: a.color }} />
                </div>
                <p className="text-xs text-[#64748B] mt-1">{a.conversations.toLocaleString()} conversations</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-white border border-[#E2E8F0]">
          <h3 className="text-base font-semibold text-[#0F172A]">Recent Conversations</h3>
          <div className="mt-4 space-y-3">
            {RECENT_CONVERSATIONS.map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-[#EFF6FF] grid place-items-center text-[#2563EB]">
                  {c.channel.includes("Voice") ? <Phone size={14} /> : c.channel.includes("WhatsApp") ? <MessageCircle size={14} /> : <MessageSquare size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] truncate">{c.phone}</p>
                  <p className="text-xs text-[#64748B]">{c.channel} · {c.time}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_COLORS[c.status] || "bg-[#F1F5F9] text-[#475569]"}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-white border border-[#E2E8F0]">
          <h3 className="text-base font-semibold text-[#0F172A]">Lead Sources</h3>
          <div className="h-56 mt-2 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={LEAD_SOURCES} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={2}>
                  {LEAD_SOURCES.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="text-center">
                <p className="text-2xl font-bold tracking-tight text-[#0F172A]">689</p>
                <p className="text-xs text-[#64748B]">Total Leads</p>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {LEAD_SOURCES.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-[#475569]"><span className="size-2 rounded-full" style={{ background: s.color }} />{s.name}</span>
                <span className="font-semibold text-[#0F172A]">{s.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-white border border-[#E2E8F0]">
          <h3 className="text-base font-semibold text-[#0F172A]">Live Agents Status</h3>
          <div className="mt-4 space-y-3">
            {[
              { name: "Voice Agent", icon: Phone, status: "Online", color: "#22C55E" },
              { name: "Chat Agent", icon: MessageSquare, status: "Online", color: "#22C55E" },
              { name: "WhatsApp Agent", icon: MessageCircle, status: "Offline", color: "#94A3B8" },
            ].map((a) => (
              <div key={a.name} className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-[#EFF6FF] grid place-items-center"><a.icon size={16} className="text-[#2563EB]" /></div>
                  <span className="text-sm font-medium text-[#0F172A]">{a.name}</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: a.color }}>
                  <span className="size-1.5 rounded-full" style={{ background: a.color }} />
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
