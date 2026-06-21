import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  MessagesSquare,
  Users,
  BarChart3,
  Plug,
  BookOpen,
  Settings,
  UserCog,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/marketing/Logo";
import { useAuth } from "@/lib/auth";
import { DASH } from "@/constants/testIds";

const items = [
  { to: "/app/overview", icon: LayoutDashboard, label: "Overview", id: DASH.sidebarOverview },
  { to: "/app/agents", icon: Bot, label: "Agents", id: DASH.sidebarAgents },
  { to: "/app/conversations", icon: MessagesSquare, label: "Conversations", id: DASH.sidebarConversations },
  { to: "/app/leads", icon: Users, label: "Leads", id: DASH.sidebarLeads },
  { to: "/app/analytics", icon: BarChart3, label: "Analytics", id: DASH.sidebarAnalytics },
  { to: "/app/integrations", icon: Plug, label: "Integrations", id: DASH.sidebarIntegrations },
  { to: "/app/knowledge-base", icon: BookOpen, label: "Knowledge Base", id: DASH.sidebarKnowledge },
  { to: "/app/team", icon: UserCog, label: "Team", id: DASH.sidebarTeam },
  { to: "/app/settings", icon: Settings, label: "Settings", id: DASH.sidebarSettings },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav("/login");
  };

  return (
    <aside className="hidden lg:flex w-64 bg-white border-r border-[#E2E8F0] flex-shrink-0 flex-col">
      <div className="h-16 px-5 flex items-center border-b border-[#E2E8F0]">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            data-testid={it.id}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#EFF6FF] text-[#2563EB]"
                  : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`
            }
          >
            <it.icon size={18} />
            {it.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-[#E2E8F0]">
        <div className="flex items-center gap-3 p-2 rounded-xl">
          <div className="size-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] grid place-items-center text-white text-sm font-semibold">
            {(user?.full_name || "U").slice(0, 1).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0F172A] truncate">{user?.full_name || "User"}</p>
            <p className="text-xs text-[#64748B] truncate capitalize">{user?.role || "owner"}</p>
          </div>
          <button
            onClick={onLogout}
            data-testid={DASH.logoutBtn}
            className="p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
