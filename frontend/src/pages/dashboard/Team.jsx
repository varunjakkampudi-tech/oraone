import React, { useMemo, useState } from "react";
import {
  UserPlus,
  Search,
  Users,
  ShieldCheck,
  UserCog,
  Eye,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const MEMBERS = [
  { id: "m1", name: "OraOne Admin",  email: "admin@oraone.ai", role: "Owner",  status: "Active",  initials: "OS", color: "#06B6D4", isYou: true },
  { id: "m2", name: "Rahul Sharma",  email: "rahul@oraone.ai", role: "Admin",  status: "Active",  initials: "RS", color: "#06B6D4" },
  { id: "m3", name: "Priya Patel",   email: "priya@oraone.ai", role: "Agent",  status: "Active",  initials: "PP", color: "#7C3AED" },
  { id: "m4", name: "Amit Verma",    email: "amit@oraone.ai",  role: "Agent",  status: "Active",  initials: "AV", color: "#F59E0B" },
  { id: "m5", name: "Neha Gupta",    email: "neha@oraone.ai",  role: "Viewer", status: "Pending", initials: "NG", color: "#16A34A" },
];

const ROLE_CLS = {
  Owner:  "bg-blue-50 text-blue-700 border-blue-200",
  Admin:  "bg-purple-50 text-purple-700 border-purple-200",
  Agent:  "bg-sky-50 text-sky-700 border-sky-200",
  Viewer: "bg-slate-100 text-slate-700 border-slate-200",
};

const STATS = [
  { key: "total",  label: "Total Members", icon: Users,       value: 5, sub: "+1 this month", subCls: "text-[#16A34A]", tone: "#2563EB", trend: [3, 4, 4, 5, 5, 6, 5] },
  { key: "admins", label: "Admins",        icon: ShieldCheck, value: 2, sub: "No change",     subCls: "text-[#64748B]", tone: "#7C3AED", trend: [2, 2, 3, 2, 3, 2, 3] },
  { key: "agents", label: "Agents",        icon: UserCog,     value: 2, sub: "+1 this month", subCls: "text-[#16A34A]", tone: "#06B6D4", trend: [1, 2, 2, 2, 3, 2, 3] },
  { key: "viewer", label: "Viewer",        icon: Eye,         value: 1, sub: "No change",     subCls: "text-[#64748B]", tone: "#F59E0B", trend: [1, 1, 1, 2, 1, 2, 1] },
];

const ACTIVITY = [
  { id: "a1", who: "Priya Patel",  initials: "PP", color: "#22C55E", action: "was added to the team",   when: "May 26, 2024 · 10:30 AM" },
  { id: "a2", who: "Amit Verma",   initials: "AV", color: "#F59E0B", action: "'s role was updated to Agent", when: "May 25, 2024 · 04:15 PM" },
  { id: "a3", who: "Rahul Sharma", initials: "RS", color: "#7C3AED", action: "was given Admin access",  when: "May 24, 2024 · 11:20 AM" },
];

export default function Team() {
  const [q, setQ] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      MEMBERS.filter(
        (m) => !q || `${m.name} ${m.email}`.toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">Team Management</h2>
          <p className="text-sm text-[#64748B] mt-1">Manage your team members and their access levels.</p>
        </div>
        <button
          data-testid="team-invite-btn"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[13px] font-semibold shadow-[0_8px_24px_-8px_rgba(37,99,235,0.5)]"
        >
          <UserPlus size={14} /> Invite Team Member
        </button>
      </div>

      {/* Members card */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] p-5">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search team members..."
            data-testid="team-search"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-[13px] placeholder-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
          />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="text-[10.5px] uppercase tracking-[0.12em] text-[#94A3B8] border-b border-[#F1F5F9]">
                <th className="px-3 py-3 font-semibold">Member</th>
                <th className="px-3 py-3 font-semibold">Email</th>
                <th className="px-3 py-3 font-semibold">Role</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((m) => (
                <tr key={m.id} className="border-b border-[#F1F5F9] last:border-0">
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full grid place-items-center text-white text-[11.5px] font-semibold" style={{ background: m.color }}>
                        {m.initials}
                      </div>
                      <span className="font-semibold text-[#0F172A]">{m.name}</span>
                      {m.isYou && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">You</span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-[#475569]">{m.email}</td>
                  <td className="px-3 py-4">
                    <span className={`inline-block text-[11px] px-2.5 py-1 rounded-full border font-medium ${ROLE_CLS[m.role]}`}>
                      {m.role}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${m.status === "Active" ? "text-[#16A34A]" : "text-[#F59E0B]"}`}>
                      <span className={`size-1.5 rounded-full ${m.status === "Active" ? "bg-[#16A34A]" : "bg-[#F59E0B]"}`} />
                      {m.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-right">
                    <button className="size-8 rounded-lg grid place-items-center hover:bg-[#F1F5F9] text-[#64748B] ml-auto" aria-label="More" data-testid={`team-actions-${m.id}`}>
                      <MoreHorizontal size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-4 border-t border-[#F1F5F9] flex items-center justify-between flex-wrap gap-3">
          <p className="text-[12px] text-[#64748B]">
            Showing <span className="font-semibold text-[#0F172A]">1</span> to{" "}
            <span className="font-semibold text-[#0F172A]">{Math.min(perPage, filtered.length)}</span> of{" "}
            <span className="font-semibold text-[#0F172A]">{filtered.length}</span> members
          </p>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={perPage}
                onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-[#E2E8F0] bg-white text-[12px] font-medium text-[#475569] hover:bg-[#F8FAFC] cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
                data-testid="team-per-page"
              >
                {[10, 25, 50].map((n) => <option key={n} value={n}>{n} per page</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => page > 1 && setPage(page - 1)} disabled={page === 1} className="size-8 rounded-lg grid place-items-center hover:bg-[#F1F5F9] text-[#64748B] disabled:opacity-40" aria-label="Previous">
                <ChevronLeft size={14} />
              </button>
              <button className="size-8 rounded-lg bg-[#2563EB] text-white font-semibold text-[12.5px]">{page}</button>
              <button onClick={() => page < totalPages && setPage(page + 1)} disabled={page >= totalPages} className="size-8 rounded-lg grid place-items-center hover:bg-[#F1F5F9] text-[#64748B] disabled:opacity-40" aria-label="Next">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Overview */}
      <div>
        <h3 className="text-base font-semibold text-[#0F172A] mb-4">Team Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.key} className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:shadow-premium hover:-translate-y-0.5 transition-all" data-testid={`team-stat-${s.key}`}>
              <div className="flex items-start gap-3">
                <div className="size-11 rounded-2xl grid place-items-center shrink-0" style={{ background: `${s.tone}1A` }}>
                  <s.icon size={18} style={{ color: s.tone }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[26px] font-bold tracking-tight text-[#0F172A] leading-none">{s.value}</p>
                  <p className="mt-1.5 text-[12px] text-[#64748B]">{s.label}</p>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <p className={`text-[12px] font-medium ${s.subCls}`}>{s.sub}</p>
                <Sparkline data={s.trend} color={s.tone} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-[#0F172A]">Recent Activity</h3>
          <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[12px] font-medium text-[#475569]">
            View All Activity
          </button>
        </div>
        <ul className="space-y-4">
          {ACTIVITY.map((a) => (
            <li key={a.id} className="flex items-start gap-3" data-testid={`team-activity-${a.id}`}>
              <div className="size-9 rounded-full grid place-items-center text-white text-[11.5px] font-semibold shrink-0" style={{ background: a.color }}>
                {a.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#0F172A]">
                  <span className="font-semibold">{a.who}</span> {a.action}
                </p>
                <p className="text-[11.5px] text-[#94A3B8] mt-0.5">{a.when}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Sparkline({ data, color }) {
  const series = data.map((v, i) => ({ x: i, y: v }));
  return (
    <div className="w-20 h-9 shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <Line type="monotone" dataKey="y" stroke={color} strokeWidth={1.8} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
