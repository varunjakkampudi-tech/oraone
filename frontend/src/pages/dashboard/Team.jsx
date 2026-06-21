import React, { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/mockData";
import { toast } from "sonner";

const ROLES = ["Owner", "Admin", "Manager", "Viewer"];

export default function Team() {
  const [members, setMembers] = useState(TEAM_MEMBERS);
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Manager");

  const invite = (e) => {
    e.preventDefault();
    setMembers([...members, { id: `t${Date.now()}`, name: email.split("@")[0], email, role, status: "invited" }]);
    toast.success(`Invitation sent to ${email}`);
    setEmail(""); setInviting(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Team Management</h2>
          <p className="text-sm text-[#64748B] mt-0.5">Invite team members and manage permissions.</p>
        </div>
        <button onClick={() => setInviting(true)} className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold inline-flex items-center gap-2" data-testid="team-invite-btn">
          <Plus size={14} /> Invite Member
        </button>
      </div>

      {inviting && (
        <form onSubmit={invite} className="p-5 rounded-2xl bg-white border border-[#E2E8F0] mb-5 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <input required type="email" placeholder="teammate@company.com" value={email} onChange={e => setEmail(e.target.value)} className="sm:col-span-6 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:border-[#2563EB]" data-testid="team-invite-email" />
          <select value={role} onChange={e => setRole(e.target.value)} className="sm:col-span-3 px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm">
            {ROLES.filter(r => r !== "Owner").map(r => <option key={r}>{r}</option>)}
          </select>
          <div className="sm:col-span-3 flex gap-2">
            <button type="submit" className="flex-1 px-3 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium" data-testid="team-invite-send">Send Invite</button>
            <button type="button" onClick={() => setInviting(false)} className="px-3 py-2.5 rounded-xl border border-[#E2E8F0] text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                {["Member", "Email", "Role", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {members.map(m => (
                <tr key={m.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] grid place-items-center text-white text-xs font-semibold">
                        {m.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-[#0F172A]">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#475569]">{m.email}</td>
                  <td className="px-4 py-3"><span className="inline-flex text-xs px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] font-semibold">{m.role}</span></td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === "active" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                      {m.status === "active" ? "Active" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#64748B]"><MoreHorizontal size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Roles & Permissions</h3>
        <div className="grid sm:grid-cols-4 gap-3 text-xs text-[#475569]">
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]"><p className="font-semibold text-[#0F172A] mb-1">Owner</p>Full access to everything</div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]"><p className="font-semibold text-[#0F172A] mb-1">Admin</p>Manage agents, leads, integrations</div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]"><p className="font-semibold text-[#0F172A] mb-1">Manager</p>Manage leads & conversations</div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]"><p className="font-semibold text-[#0F172A] mb-1">Viewer</p>Read-only access</div>
        </div>
      </div>
    </div>
  );
}
