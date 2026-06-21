import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Phone, MessageSquare, MessageCircle, Bot, Pause, Play, Trash2, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";
import { api, formatApiError } from "@/lib/api";
import { toast } from "sonner";
import { DASH } from "@/constants/testIds";

const TYPE_META = {
  voice: { icon: Phone, color: "#2563EB", label: "Voice Agent", desc: "Answers calls and talks like a human." },
  chat: { icon: MessageSquare, color: "#10B981", label: "Chat Agent", desc: "Chats on your website and engages visitors." },
  whatsapp: { icon: MessageCircle, color: "#22C55E", label: "WhatsApp Agent", desc: "AI that replies on WhatsApp." },
};

export default function Agents() {
  const nav = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/agents");
      setAgents(data);
    } catch {
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleStatus = async (a) => {
    const newStatus = a.status === "active" ? "paused" : "active";
    try {
      await api.put(`/agents/${a.id}`, { ...a, status: newStatus });
      load();
      toast.success(`Agent ${newStatus}`);
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    }
  };

  const remove = async (a) => {
    if (!window.confirm(`Delete "${a.name}"?`)) return;
    try {
      await api.delete(`/agents/${a.id}`);
      load();
      toast.success("Agent deleted");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Agents</h2>
          <p className="text-sm text-[#64748B] mt-0.5">Manage your AI agents and their configurations.</p>
        </div>
        <Link to="/app/agents/new" data-testid={DASH.createAgentBtn} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold">
          <Plus size={16} /> Create Agent
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3].map(i => <div key={i} className="h-48 rounded-2xl skeleton" />)}
        </div>
      ) : agents.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border border-dashed border-[#E2E8F0] text-center">
          <div className="size-14 mx-auto rounded-2xl bg-[#EFF6FF] grid place-items-center mb-4">
            <Bot size={24} className="text-[#2563EB]" />
          </div>
          <h3 className="text-lg font-semibold text-[#0F172A]">No agents yet</h3>
          <p className="mt-2 text-sm text-[#64748B]">Create your first AI agent to start automating conversations.</p>
          <button onClick={() => nav("/app/agents/new")} className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold">
            <Plus size={16} /> Create Your First Agent
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((a, i) => {
            const meta = TYPE_META[a.type] || TYPE_META.chat;
            const Icon = meta.icon;
            return (
              <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:shadow-premium transition-all">
                <div className="flex items-start gap-3">
                  <div className="size-11 rounded-xl grid place-items-center" style={{ background: `${meta.color}15` }}>
                    <Icon size={18} style={{ color: meta.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-[#0F172A] truncate">{a.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${a.status === "active" ? "bg-green-50 text-green-700" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                        {a.status === "active" ? "Active" : "Paused"}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5">{meta.label}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[#64748B]">{meta.desc}</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div>
                    <p className="text-xs text-[#64748B]">Conversations</p>
                    <p className="font-semibold text-[#0F172A]">{a.conversations.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Success Rate</p>
                    <p className="font-semibold text-[#0F172A]">{a.success_rate}%</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <Link to={`/app/agents/${a.id}`} className="flex-1 text-center px-3 py-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-sm font-medium text-[#0F172A]" data-testid={`agent-configure-${a.id}`}>
                    Configure
                  </Link>
                  <button onClick={() => toggleStatus(a)} className="size-9 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] grid place-items-center text-[#475569]" aria-label="Toggle status" data-testid={`agent-toggle-${a.id}`}>
                    {a.status === "active" ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <button onClick={() => remove(a)} className="size-9 rounded-xl border border-[#E2E8F0] hover:bg-red-50 hover:border-red-200 grid place-items-center text-red-500" aria-label="Delete" data-testid={`agent-delete-${a.id}`}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
