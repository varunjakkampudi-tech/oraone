import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { api, formatApiError } from "@/lib/api";
import { toast } from "sonner";
import { AUTH } from "@/constants/testIds";
import { useSEO } from "@/lib/seo";

export function VerifyEmail() {
  useSEO({ title: "Verify Email", description: "Verify your OraOne email address." });
  return (
    <div className="text-center">
      <div className="mx-auto size-16 rounded-2xl bg-[#EFF6FF] grid place-items-center mb-5">
        <Mail size={28} className="text-[#2563EB]" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Verify Your Email</h1>
      <p className="mt-3 text-[#64748B]">We've sent a verification link to your inbox. Click the link to verify your email address.</p>
      <button className="mt-6 text-sm font-semibold text-[#2563EB] hover:underline" data-testid="verify-resend">Resend Email</button>
      <p className="mt-8 text-sm text-[#64748B]">Already verified? <Link to="/login" className="font-semibold text-[#2563EB] hover:underline">Login</Link></p>
    </div>
  );
}

export function ForgotPassword() {
  useSEO({ title: "Forgot Password", description: "Reset your OraOne password." });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
      toast.success("If the email exists, a reset link has been sent.");
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Reset your password</h1>
      <p className="mt-2 text-[#64748B]">Enter your email and we'll send you a link to reset your password.</p>
      {sent ? (
        <div className="mt-8 p-5 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-sm">
          Check your email for a password reset link.
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Email Address</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} data-testid={AUTH.forgotEmail} placeholder="you@company.com" className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10" />
          </div>
          <button type="submit" disabled={busy} data-testid={AUTH.forgotSubmit} className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm transition-colors disabled:opacity-60">
            {busy ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-[#64748B]">
        Remembered? <Link to="/login" className="font-semibold text-[#2563EB] hover:underline">Login</Link>
      </p>
    </div>
  );
}

export function ResetPassword() {
  useSEO({ title: "Reset Password", description: "Set a new OraOne password." });
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) return toast.error("Missing reset token");
    setBusy(true);
    try {
      await api.post("/auth/reset-password", { token, password });
      toast.success("Password updated. You can now log in.");
      window.location.href = "/login";
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail) || "Failed");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Set a new password</h1>
      <p className="mt-2 text-[#64748B]">Choose a strong password (at least 8 characters).</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} data-testid={AUTH.resetPassword} placeholder="New password" className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10" />
        <button type="submit" disabled={busy} data-testid={AUTH.resetSubmit} className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm">
          {busy ? "Saving..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
