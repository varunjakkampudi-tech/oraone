import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MessageSquare,
  MessageCircle,
  Users,
  Calendar,
  ChevronDown,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  CONVERSATION_SUMMARY,
  TOP_AGENTS,
  LEAD_SOURCES,
  RECENT_CONVERSATIONS,
} from "@/lib/mockData";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth";

const KPI_CARDS = [
  { key: "calls_answered",     label: "Calls Answered",      value: 1246, delta: "18.5%", icon: Phone,         tone: "#2563EB" },
  { key: "chats_handled",      label: "Chats Handled",       value: 2354, delta: "22.1%", icon: MessageSquare, tone: "#7C3AED" },
  { key: "whatsapp_chats",     label: "WhatsApp Chats",      value: 1890, delta: "16.7%", icon: MessageCircle, tone: "#22C55E" },
  { key: "leads_captured",     label: "Leads Captured",      value: 689,  delta: "25.3%", icon: Users,         tone: "#0EA5E9" },
  { key: "appointments",       label: "Appointments Booked", value: 342,  delta: "20.8%", icon: Calendar,      tone: "#F59E0B" },
];

const STATUS_COLORS = {
  Completed: "bg-green-50 text-green-700 border-green-200",
  Qualified: "bg-blue-50 text-blue-700 border-blue-200",
  "Appointment Booked": "bg-purple-50 text-purple-700 border-purple-200",
  Missed: "bg-red-50 text-red-700 border-red-200",
};

const CHANNEL_ICON = (channel) => {
  if (channel.includes("Voice")) return { Icon: Phone, color: "#2563EB", bg: "#EFF6FF" };
  if (channel.includes("WhatsApp")) return { Icon: MessageCircle, color: "#16A34A", bg: "#DCFCE7" };
  return { Icon: MessageSquare, color: "#7C3AED", bg: "#EDE9FE" };
};

const AGENT_ICONS = {
  "Voice Agent": Phone,
  "Chat Agent": MessageSquare,
  "WhatsApp Agent": MessageCircle,
};

const LIVE_AGENTS = [
  { name: "Voice Agent",    icon: Phone,         color: "#2563EB", bg: "#EFF6FF", status: "Online",  active: 128, idle: 12 },
  { name: "Chat Agent",     icon: MessageSquare, color: "#7C3AED", bg: "#EDE9FE", status: "Online",  active: 98,  idle: 6  },
  { name: "WhatsApp Agent", icon: MessageCircle, color: "#16A34A", bg: "#DCFCE7", status: "Offline", active: 64,  idle: 8  },
];

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/overview").then((r) => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      {/* ----- Header row ----- */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between flex-wrap gap-3"
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Hello, {user?.full_name?.split(" ")[0] || "there"} <span className="inline-block">👋</span>
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Here&apos;s what&apos;s happening with your AI agents today.
          </p>
        </div>
        <button
          className="px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-sm font-medium text-[#475569] inline-flex items-center gap-2 hover:bg-[#F8FAFC] transition-colors"
          data-testid="dashboard-date-range"
        >
          <Calendar size={14} /> May 20 — May 26, 2024
          <ChevronDown size={14} className="text-[#94A3B8]" />
        </button>
      </motion.div>

      {/* ----- KPI cards ----- */}
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
              className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:shadow-premium hover:-translate-y-0.5 transition-all"
              data-testid={`kpi-${k.key}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="size-11 rounded-2xl grid place-items-center shrink-0"
                  style={{ background: `${k.tone}1A` }}
                >
                  <Icon size={18} style={{ color: k.tone }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-[#64748B] leading-tight">{k.label}</p>
                  <p className="mt-1 text-[26px] font-bold tracking-tight text-[#0F172A] leading-none">
                    {Number(live).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[12px] font-semibold text-[#16A34A]">
                <TrendingUp size={12} /> {k.delta}
              </div>
              <p className="mt-1 text-[11px] text-[#94A3B8]">vs May 13 — May 19</p>
            </motion.div>
          );
        })}
      </div>

      {/* ----- Chart row ----- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Conversation Summary chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-white border border-[#E2E8F0]"
        >
          <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
            <div>
              <h3 className="text-base font-semibold text-[#0F172A]">Conversation Summary</h3>
              <button className="mt-1 inline-flex items-center gap-1 text-[12px] text-[#64748B] hover:text-[#0F172A]">
                Last 7 days <ChevronDown size={12} />
              </button>
            </div>
            <div className="flex items-center gap-4 text-[12px] text-[#475569]">
              {[
                { label: "Calls", color: "#2563EB" },
                { label: "Chats", color: "#7C3AED" },
                { label: "WhatsApp", color: "#22C55E" },
              ].map((l) => (
                <span key={l.label} className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CONVERSATION_SUMMARY} margin={{ left: -12, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="gCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gChats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.14} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gWa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.14} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 1000]} ticks={[0, 250, 500, 750, 1000]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E2E8F0",
                    fontSize: 12,
                    boxShadow: "0 12px 30px -10px rgba(15,23,42,0.18)",
                  }}
                  labelStyle={{ color: "#0F172A", fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="Calls"    stroke="#2563EB" strokeWidth={2.5} fill="url(#gCalls)" dot={{ r: 3, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 5 }} />
                <Area type="monotone" dataKey="Chats"    stroke="#7C3AED" strokeWidth={2.5} fill="url(#gChats)" dot={{ r: 3, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 5 }} />
                <Area type="monotone" dataKey="WhatsApp" stroke="#22C55E" strokeWidth={2.5} fill="url(#gWa)"    dot={{ r: 3, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Performing Agents */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white border border-[#E2E8F0]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#0F172A]">Top Performing Agents</h3>
            <button className="text-[12px] font-medium text-[#2563EB] hover:underline">View all</button>
          </div>
          <div className="mt-5 space-y-5">
            {TOP_AGENTS.map((a) => {
              const Icon = AGENT_ICONS[a.name] || MessageSquare;
              return (
                <div key={a.name}>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl grid place-items-center shrink-0" style={{ background: `${a.color}1A` }}>
                      <Icon size={16} style={{ color: a.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0F172A] leading-tight">{a.name}</p>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        {a.conversations.toLocaleString()} conversations
                      </p>
                    </div>
                    <span className="text-sm font-bold text-[#0F172A]">{a.success}%</span>
                  </div>
                  <div className="mt-2.5 h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{ width: `${a.success}%`, background: a.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ----- Bottom row: Recent Convos | Lead Sources | Live Agents ----- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Conversations */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white border border-[#E2E8F0]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#0F172A]">Recent Conversations</h3>
            <button className="text-[12px] font-medium text-[#2563EB] hover:underline">View all</button>
          </div>
          <div className="mt-4 space-y-3.5">
            {RECENT_CONVERSATIONS.slice(0, 4).map((c) => {
              const { Icon, color, bg } = CHANNEL_ICON(c.channel);
              return (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="size-10 rounded-xl grid place-items-center shrink-0" style={{ background: bg }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-[#0F172A] truncate">{c.phone}</p>
                    <p className="text-[11.5px] text-[#64748B] mt-0.5">
                      {c.channel} · {c.time}
                    </p>
                  </div>
                  <span
                    className={`text-[10.5px] px-2.5 py-1 rounded-full border whitespace-nowrap font-medium ${
                      STATUS_COLORS[c.status] || "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Lead Sources */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white border border-[#E2E8F0]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#0F172A]">Lead Sources</h3>
            <button className="text-[12px] font-medium text-[#2563EB] hover:underline">View report</button>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_1fr] gap-4 items-center">
            {/* Donut */}
            <div className="relative h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={LEAD_SOURCES}
                    dataKey="value"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {LEAD_SOURCES.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }}
                    formatter={(v, n) => [`${v}%`, n]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="text-center">
                  <p className="text-xl font-bold tracking-tight text-[#0F172A] leading-none">689</p>
                  <p className="text-[10.5px] text-[#64748B] mt-1">Total Leads</p>
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="space-y-2">
              {LEAD_SOURCES.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-2 text-[#475569]">
                    <span className="size-2 rounded-full shrink-0" style={{ background: s.color }} />
                    {s.name}
                  </span>
                  <span className="font-semibold text-[#0F172A]">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 inline-flex w-full items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#ECFDF5] text-[#15803D] text-[12px] font-medium">
            <TrendingUp size={13} /> 18.5% more leads this week
          </div>
        </motion.div>

        {/* Live Agents Status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white border border-[#E2E8F0]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[#0F172A]">Live Agents Status</h3>
            <button className="text-[12px] font-medium text-[#2563EB] hover:underline">View all</button>
          </div>
          <div className="mt-4 space-y-3">
            {LIVE_AGENTS.map((a) => {
              const online = a.status === "Online";
              return (
                <div
                  key={a.name}
                  className="flex items-center justify-between p-3 rounded-2xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-premium transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-xl grid place-items-center shrink-0" style={{ background: a.bg }}>
                      <a.icon size={16} style={{ color: a.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#0F172A] truncate">{a.name}</p>
                      <span
                        className={`mt-0.5 inline-flex items-center gap-1.5 text-[10.5px] font-medium ${
                          online ? "text-[#16A34A]" : "text-[#94A3B8]"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${online ? "bg-[#16A34A]" : "bg-[#94A3B8]"}`}
                        />
                        {a.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-center">
                    <div>
                      <p className="text-[14px] font-bold text-[#0F172A] leading-none">{a.active}</p>
                      <p className="text-[9.5px] text-[#94A3B8] mt-0.5 uppercase tracking-wider">Active</p>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#0F172A] leading-none">{a.idle}</p>
                      <p className="text-[9.5px] text-[#94A3B8] mt-0.5 uppercase tracking-wider">Idle</p>
                    </div>
                    <ChevronRight size={14} className="text-[#94A3B8] ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
