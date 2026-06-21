import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { AUTH } from "@/constants/testIds";
import { useSEO } from "@/lib/seo";

export default function Login() {
  useSEO({ title: "Login", description: "Sign in to your OraOne account" });
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const res = await login(email, password);
    setBusy(false);
    if (res.ok) {
      toast.success("Welcome back!");
      nav(res.user.onboarded ? "/app/overview" : "/onboarding/agent");
    } else {
      toast.error(res.error || "Login failed");
    }
  };

  const social = (provider) => toast.info(`${provider} login is coming soon.`);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Welcome back</h1>
      <p className="mt-2 text-[#64748B]">Login to your account</p>

      <div className="mt-8 space-y-3">
        <button data-testid={AUTH.loginGoogle} onClick={() => social("Google")} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-sm font-medium text-[#0F172A] transition-colors">
          <GoogleIcon /> Continue with Google
        </button>
        <button data-testid={AUTH.loginMicrosoft} onClick={() => social("Microsoft")} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-sm font-medium text-[#0F172A] transition-colors">
          <MicrosoftIcon /> Continue with Microsoft <span className="text-[10px] text-[#64748B]">(Coming Soon)</span>
        </button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E2E8F0]" />
        <span className="text-xs text-[#94A3B8]">or</span>
        <div className="flex-1 h-px bg-[#E2E8F0]" />
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Email Address</label>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            data-testid={AUTH.loginEmail}
            placeholder="you@company.com"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Password</label>
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            data-testid={AUTH.loginPassword}
            placeholder="••••••••"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
          />
        </div>
        <div className="text-right">
          <Link to="/forgot-password" className="text-sm font-medium text-[#2563EB] hover:underline">Forgot password?</Link>
        </div>
        <button
          type="submit" disabled={busy}
          data-testid={AUTH.loginSubmit}
          className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-colors disabled:opacity-60"
        >
          {busy ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#64748B]">
        Don't have an account? <Link to="/signup" className="font-semibold text-[#2563EB] hover:underline">Sign up</Link>
      </p>
      <p className="mt-3 text-center text-[11px] text-[#94A3B8]">
        Demo: admin@oraone.ai / OraOne@2026
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2 14-5.4l-6.5-5.5c-2 1.4-4.5 2.3-7.5 2.3-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.5 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.7 2.1-2 4-3.8 5.4l6.5 5.5C42.6 35.6 44 30.1 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 23 23">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  );
}
