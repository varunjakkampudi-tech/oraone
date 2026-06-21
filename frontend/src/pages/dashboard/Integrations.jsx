import React, { useState } from "react";
import { Check } from "lucide-react";
import { INTEGRATIONS } from "@/lib/mockData";
import { toast } from "sonner";

const CATEGORIES = ["All", "CRM", "Calendar", "Communication", "Productivity", "Other"];

export default function Integrations() {
  const [cat, setCat] = useState("All");
  const [connected, setConnected] = useState({});

  const toggle = (slug, name) => {
    setConnected({ ...connected, [slug]: !connected[slug] });
    toast.success(connected[slug] ? `Disconnected ${name}` : `Connected ${name}`);
  };

  const list = cat === "All" ? INTEGRATIONS : INTEGRATIONS.filter(i => i.category === cat);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Integrations</h2>
        <p className="text-sm text-[#64748B] mt-0.5">Connect OraOne with your favorite tools.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} data-testid={`dash-integrations-filter-${c.toLowerCase()}`} className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${cat === c ? "bg-[#2563EB] text-white" : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(i => {
          const isConnected = !!connected[i.slug];
          return (
            <div key={i.slug} className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:shadow-premium transition-all" data-testid={`dash-integration-${i.slug}`}>
              <div className="flex items-start gap-3">
                <div className="size-11 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 grid place-items-center text-[#2563EB] font-bold flex-shrink-0">
                  {i.name.slice(0, 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#0F172A]">{i.name}</h3>
                    {isConnected && <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-semibold"><Check size={10} /> Connected</span>}
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">{i.category}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#475569] leading-relaxed">{i.desc}</p>
              <button onClick={() => toggle(i.slug, i.name)} className={`mt-4 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isConnected ? "border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]" : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"}`}>
                {isConnected ? "Disconnect" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
