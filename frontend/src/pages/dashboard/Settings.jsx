import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const TABS = ["Profile", "Company", "Notifications", "Security", "API Keys", "Audit Logs"];

export default function Settings() {
  const { user } = useAuth();
  const [tab, setTab] = useState("Profile");
  const [showKey, setShowKey] = useState(false);
  const apiKey = "ora_live_sk_" + (user?.id || "demo").replace(/-/g, "").slice(0, 24);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Settings</h2>
        <p className="text-sm text-[#64748B] mt-0.5">Manage your account and workspace settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <div className="p-2 rounded-2xl bg-white border border-[#E2E8F0]">
            <nav className="space-y-0.5">
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === t ? "bg-[#EFF6FF] text-[#2563EB]" : "text-[#475569] hover:bg-[#F8FAFC]"}`} data-testid={`settings-tab-${t.toLowerCase().replace(/\s+/g, "-")}`}>
                  {t}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <section className="lg:col-span-9 p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0]">
          {tab === "Profile" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-lg font-semibold text-[#0F172A]">Profile Information</h3>
              <div className="flex items-center gap-5">
                <div className="size-16 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] grid place-items-center text-white text-xl font-semibold">
                  {(user?.full_name || "U").slice(0, 1).toUpperCase()}
                </div>
                <button className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-sm font-medium hover:bg-[#F8FAFC]">Change avatar</button>
              </div>
              <Input label="Full Name" defaultValue={user?.full_name} />
              <Input label="Email" defaultValue={user?.email} disabled />
              <button className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold">Save changes</button>
            </div>
          )}
          {tab === "Company" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-lg font-semibold text-[#0F172A]">Company</h3>
              <Input label="Company Name" defaultValue={user?.company_name} />
              <Input label="Website" placeholder="https://yourcompany.com" />
              <button className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold">Save changes</button>
            </div>
          )}
          {tab === "Notifications" && (
            <div className="space-y-3 max-w-xl">
              <h3 className="text-lg font-semibold text-[#0F172A]">Notifications</h3>
              {["New lead captured", "Missed call alert", "Daily summary email", "Weekly analytics report"].map(n => (
                <label key={n} className="flex items-center justify-between p-4 rounded-xl border border-[#E2E8F0]">
                  <span className="text-sm text-[#0F172A]">{n}</span>
                  <input type="checkbox" defaultChecked className="accent-[#2563EB]" />
                </label>
              ))}
            </div>
          )}
          {tab === "Security" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-lg font-semibold text-[#0F172A]">Security</h3>
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="At least 8 characters" />
              <Input label="Confirm New Password" type="password" placeholder="Repeat new password" />
              <button className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold">Update password</button>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <p className="text-sm font-semibold text-[#0F172A]">Two-Factor Authentication</p>
                <p className="text-xs text-[#64748B] mt-1">Add an extra layer of security to your account. MFA Ready Architecture — coming soon.</p>
              </div>
            </div>
          )}
          {tab === "API Keys" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="text-lg font-semibold text-[#0F172A]">API Keys</h3>
              <p className="text-sm text-[#64748B]">Use this key to authenticate API requests to OraOne. Keep it secret.</p>
              <div className="flex items-stretch gap-2">
                <div className="flex-1 px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] font-mono text-sm text-[#0F172A]">
                  {showKey ? apiKey : "•".repeat(apiKey.length)}
                </div>
                <button onClick={() => setShowKey(!showKey)} className="size-10 rounded-xl border border-[#E2E8F0] grid place-items-center text-[#475569] hover:bg-[#F8FAFC]" aria-label="Toggle key visibility">
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button onClick={() => { navigator.clipboard.writeText(apiKey); toast.success("Copied!"); }} className="size-10 rounded-xl border border-[#E2E8F0] grid place-items-center text-[#475569] hover:bg-[#F8FAFC]" aria-label="Copy">
                  <Copy size={16} />
                </button>
                <button onClick={() => toast.info("Key rotation coming soon")} className="size-10 rounded-xl border border-[#E2E8F0] grid place-items-center text-[#475569] hover:bg-[#F8FAFC]" aria-label="Rotate">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          )}
          {tab === "Audit Logs" && (
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A]">Audit Logs</h3>
              <p className="text-sm text-[#64748B] mt-1">Activity history for compliance and security.</p>
              <ul className="mt-5 divide-y divide-[#E2E8F0]">
                {[
                  { who: user?.full_name || "Admin", what: "Logged in", when: "2 mins ago" },
                  { who: "System", what: "Indexed knowledge base", when: "1 hour ago" },
                  { who: user?.full_name || "Admin", what: "Created Voice Agent", when: "Yesterday" },
                  { who: "Sarah Connor", what: "Updated team permissions", when: "2 days ago" },
                ].map((l, i) => (
                  <li key={i} className="py-3 flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-[#0F172A]">{l.what}</p>
                      <p className="text-xs text-[#64748B]">{l.who}</p>
                    </div>
                    <span className="text-xs text-[#64748B]">{l.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Input({ label, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">{label}</label>
      <input {...rest} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 disabled:bg-[#F8FAFC]" />
    </div>
  );
}
