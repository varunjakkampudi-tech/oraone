import React, { useEffect, useState } from "react";
import { Download, Filter, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { LEADS } from "@/lib/mockData";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { DASH } from "@/constants/testIds";

const STATUS_COLORS = {
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-yellow-50 text-yellow-700",
  Qualified: "bg-green-50 text-green-700",
  Won: "bg-purple-50 text-purple-700",
  Lost: "bg-red-50 text-red-700",
};

function toCSV(rows) {
  if (!rows.length) return "";
  const headers = ["Name", "Email", "Phone", "Source", "Intent", "Status", "Score", "Date"];
  const body = rows.map(r => [r.name, r.email, r.phone, r.source, r.intent, r.status, r.score, r.date].map(v => `"${(v ?? "").toString().replace(/"/g, '""')}"`).join(","));
  return [headers.join(","), ...body].join("\n");
}

export default function Leads() {
  const [leads, setLeads] = useState(LEADS);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.get("/leads").then(r => {
      if (r.data?.length) {
        // merge backend leads with mock for visual richness
        const backend = r.data.map(l => ({
          ...l, intent: l.intent || "—", date: new Date(l.created_at).toLocaleDateString(),
        }));
        setLeads([...backend, ...LEADS]);
      }
    }).catch(() => {});
  }, []);

  const filtered = leads.filter(l =>
    !query || [l.name, l.email, l.phone, l.intent].some(v => v && v.toLowerCase().includes(query.toLowerCase()))
  );

  const exportCSV = () => {
    const csv = toCSV(filtered);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "oraone-leads.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Leads exported as CSV");
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Leads</h2>
          <p className="text-sm text-[#64748B] mt-0.5">{filtered.length} total · captured automatically by your agents</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] w-64">
            <Search size={14} className="text-[#64748B]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search leads..." className="bg-transparent text-sm flex-1 outline-none" data-testid="leads-search" />
          </div>
          <button className="px-3 py-2 rounded-xl border border-[#E2E8F0] bg-white text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC] inline-flex items-center gap-1.5">
            <Filter size={14} /> Filter
          </button>
          <button onClick={exportCSV} data-testid={DASH.exportLeadsBtn} className="px-3 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold inline-flex items-center gap-1.5">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr className="text-left">
                {["Name", "Contact", "Source", "Intent", "Status", "Score", "Date", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-[#F8FAFC]" data-testid={`lead-row-${l.id}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] grid place-items-center text-white text-xs font-semibold">
                        {l.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-medium text-[#0F172A]">{l.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#475569]">
                    <p>{l.email}</p>
                    <p className="text-xs text-[#64748B]">{l.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-[#475569]">{l.source}</td>
                  <td className="px-4 py-3 text-[#475569]">{l.intent}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${STATUS_COLORS[l.status] || "bg-[#F1F5F9] text-[#475569]"}`}>{l.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden">
                        <div className="h-full bg-[#2563EB]" style={{ width: `${l.score}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-[#0F172A]">{l.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#64748B] text-xs">{l.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#64748B]" data-testid={`lead-view-${l.id}`}><Eye size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9] text-[#64748B]"><Pencil size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
