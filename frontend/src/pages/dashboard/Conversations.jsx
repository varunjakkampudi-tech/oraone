import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, MessageCircle } from "lucide-react";
import { LIVE_TRANSCRIPT } from "@/lib/mockData";

const CONVERSATIONS = [
  { id: "v1", name: "Rahul Sharma", channel: "voice", phone: "+91 98765 43210", time: "10:30 AM" },
  { id: "c1", name: "Priya Patel", channel: "chat", phone: "Visitor #2354", time: "10:25 AM" },
  { id: "w1", name: "Amit Verma", channel: "whatsapp", phone: "+91 99876 54321", time: "10:20 AM" },
  { id: "v2", name: "Anita Singh", channel: "voice", phone: "+91 98989 67676", time: "10:10 AM" },
  { id: "c2", name: "Karan Mehta", channel: "chat", phone: "Visitor #2353", time: "10:05 AM" },
];

const ICON = { voice: Phone, chat: MessageSquare, whatsapp: MessageCircle };

export default function Conversations() {
  const [active, setActive] = useState(CONVERSATIONS[0]);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? CONVERSATIONS : CONVERSATIONS.filter(c => c.channel === filter);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Conversations</h2>
        <p className="text-sm text-[#64748B] mt-0.5">Live transcripts and conversation history across all channels.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden">
          <div className="p-4 border-b border-[#E2E8F0]">
            <div className="flex gap-2 overflow-x-auto">
              {[
                { k: "all", l: "All" },
                { k: "voice", l: "Voice Calls" },
                { k: "chat", l: "Chats" },
                { k: "whatsapp", l: "WhatsApp" },
              ].map(t => (
                <button key={t.k} onClick={() => setFilter(t.k)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${filter === t.k ? "bg-[#2563EB] text-white" : "bg-[#F8FAFC] text-[#475569]"}`} data-testid={`conv-filter-${t.k}`}>
                  {t.l}
                </button>
              ))}
            </div>
          </div>
          <ul className="divide-y divide-[#E2E8F0] max-h-[560px] overflow-y-auto scrollbar-thin">
            {filtered.map(c => {
              const Icon = ICON[c.channel];
              return (
                <li key={c.id} onClick={() => setActive(c)} className={`p-4 cursor-pointer hover:bg-[#F8FAFC] flex items-center gap-3 ${active?.id === c.id ? "bg-[#EFF6FF]" : ""}`} data-testid={`conv-${c.id}`}>
                  <div className="size-9 rounded-full bg-[#EFF6FF] grid place-items-center text-[#2563EB]"><Icon size={14} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] truncate">{c.name}</p>
                    <p className="text-xs text-[#64748B] truncate">{c.phone} · {c.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-8 rounded-2xl bg-[#0F172A] border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{active?.name}</p>
              <p className="text-xs text-white/60 capitalize">{active?.channel} · {active?.phone}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-green-400 font-medium">
              <span className="size-1.5 rounded-full bg-green-400 animate-pulse" /> Live
            </span>
          </div>
          <div className="p-5 max-h-[460px] overflow-y-auto scrollbar-thin space-y-3">
            {LIVE_TRANSCRIPT.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className={`flex ${m.who === "customer" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${m.who === "customer" ? "bg-[#2563EB] text-white" : "bg-white/10 text-white"}`}>
                  <p className="text-[10px] text-white/60 mb-0.5 uppercase tracking-wider">{m.who} · {m.time}</p>
                  {m.text}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-4 border-t border-white/10 flex items-center gap-2">
            <input placeholder="Type a note..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30" />
            <button className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-sm font-medium">Add Note</button>
          </div>
        </div>
      </div>
    </div>
  );
}
