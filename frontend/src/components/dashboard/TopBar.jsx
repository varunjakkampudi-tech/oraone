import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Search, Plus } from "lucide-react";
import { DASH } from "@/constants/testIds";

const TITLES = {
  "/app/overview": "Overview",
  "/app/agents": "Agents",
  "/app/agents/new": "Create Agent",
  "/app/conversations": "Conversations",
  "/app/leads": "Leads",
  "/app/analytics": "Analytics",
  "/app/integrations": "Integrations",
  "/app/knowledge-base": "Knowledge Base",
  "/app/team": "Team",
  "/app/settings": "Settings",
};

export default function TopBar() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const matchKey = Object.keys(TITLES).find((k) => pathname === k || pathname.startsWith(k + "/"));
  const title = TITLES[matchKey] || "Dashboard";

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-[#0F172A] tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] w-72">
          <Search size={16} className="text-[#64748B]" />
          <input
            placeholder="Search anything..."
            className="bg-transparent text-sm flex-1 outline-none placeholder:text-[#94A3B8]"
            data-testid="dashboard-search-input"
          />
        </div>
        <button
          className="p-2.5 rounded-xl text-[#64748B] hover:bg-[#F1F5F9] relative"
          aria-label="Notifications"
          data-testid="dashboard-notifications-btn"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-[#EF4444]" />
        </button>
        <button
          onClick={() => nav("/app/agents/new")}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-colors"
          data-testid={DASH.createAgentBtn}
        >
          <Plus size={16} /> Create Agent
        </button>
      </div>
    </header>
  );
}
