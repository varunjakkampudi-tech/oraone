import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { AUTH } from "@/constants/testIds";
import { useSEO } from "@/lib/seo";
import {
  Gift,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Signup() {
  useSEO({ title: "Sign up", description: "Create your OraOne account — 14-day free trial." });
  const { register } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm: "",
    company_name: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords don't match");
      return;
    }
    if (!agree) {
      toast.error("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    setBusy(true);
    const { confirm, ...payload } = form;
    const res = await register(payload);
    setBusy(false);
    if (res.ok) {
      toast.success("Account created! Let's set up your first AI agent.");
      nav("/onboarding/agent");
    } else {
      toast.error(res.error || "Sign up failed");
    }
  };

  const social = (p) => toast.info(`${p} signup is coming soon.`);

  return (
    <div data-testid="signup-form">
      {/* 14-day free trial badge */}
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3EBFF] text-[#7C3AED] text-xs font-semibold">
        <Gift size={13} />
        14-day free trial
      </span>

      <h1 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
        Create your account
      </h1>
      <p className="mt-2 text-[15px] text-[#64748B]">
        Start your 14-day free trial. No credit card required.
      </p>

      {/* Social row */}
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          data-testid={AUTH.signupGoogle}
          onClick={() => social("Google")}
          className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] text-sm font-medium text-[#0F172A] transition-all"
        >
          <GoogleIcon /> Continue with Google
        </button>
        <button
          type="button"
          data-testid={AUTH.signupMicrosoft}
          onClick={() => social("Phone")}
          className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] text-sm font-medium text-[#0F172A] transition-all"
        >
          <Phone size={17} className="text-[#7C3AED]" /> Continue with Phone
        </button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E2E8F0]" />
        <span className="text-xs text-[#94A3B8]">or</span>
        <div className="flex-1 h-px bg-[#E2E8F0]" />
      </div>

      {/* Form */}
      <form onSubmit={submit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Full Name"
            icon={User}
            placeholder="John Doe"
            value={form.full_name}
            onChange={(v) => setForm({ ...form, full_name: v })}
            testId={AUTH.signupFullName}
            required
          />
          <Field
            label="Email"
            icon={Mail}
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            testId={AUTH.signupEmail}
            required
          />
        </div>

        <Field
          label="Password"
          icon={Lock}
          type={showPw ? "text" : "password"}
          placeholder="At least 8 characters"
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
          testId={AUTH.signupPassword}
          required
          minLength={8}
          trailing={
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="text-[#94A3B8] hover:text-[#475569] transition-colors"
              aria-label={showPw ? "Hide password" : "Show password"}
              data-testid="signup-password-toggle"
            >
              {showPw ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
        />

        <Field
          label="Confirm Password"
          icon={Lock}
          type={showCpw ? "text" : "password"}
          placeholder="Confirm your password"
          value={form.confirm}
          onChange={(v) => setForm({ ...form, confirm: v })}
          testId="signup-confirm-password-input"
          required
          minLength={8}
          trailing={
            <button
              type="button"
              onClick={() => setShowCpw((s) => !s)}
              className="text-[#94A3B8] hover:text-[#475569] transition-colors"
              aria-label={showCpw ? "Hide password" : "Show password"}
              data-testid="signup-confirm-password-toggle"
            >
              {showCpw ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
        />

        {/* Trust card */}
        <div
          className="relative overflow-hidden rounded-2xl px-5 py-4 flex items-center gap-4 border border-[#E9D5FF]"
          style={{ background: "linear-gradient(135deg,#F5F0FF 0%,#EEF2FF 100%)" }}
        >
          <div className="size-11 rounded-xl grid place-items-center bg-white shadow-[0_4px_14px_-4px_rgba(124,58,237,0.35)] shrink-0">
            <ShieldCheck size={20} className="text-[#7C3AED]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#0F172A]">Your data is safe with us</p>
            <p className="mt-0.5 text-[12.5px] text-[#64748B] leading-snug">
              We use enterprise-grade encryption and security practices to protect your information.
            </p>
          </div>
          <LockIllustration />
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            data-testid="signup-agree-terms"
            className="mt-0.5 size-4 accent-[#7C3AED] cursor-pointer"
          />
          <span className="text-[13px] text-[#475569]">
            I agree to the{" "}
            <Link to="/terms" className="text-[#7C3AED] font-medium hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-[#7C3AED] font-medium hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={busy}
          data-testid={AUTH.signupSubmit}
          className="group w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-semibold text-[15px] transition-all disabled:opacity-60 shadow-[0_18px_40px_-12px_rgba(124,58,237,0.55)]"
          style={{ background: "linear-gradient(90deg,#7C3AED 0%,#6366F1 100%)" }}
        >
          {busy ? "Creating account..." : "Create Account"}
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-[#64748B]">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-[#7C3AED] hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

/* ----------------------------- Building blocks ----------------------------- */

function Field({ label, icon: Icon, type = "text", placeholder, value, onChange, testId, required, minLength, trailing }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">{label}</label>
      <div className="relative">
        <Icon
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
        />
        <input
          type={type}
          required={required}
          minLength={minLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          data-testid={testId}
          className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#E2E8F0] bg-white text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-[#7C3AED] focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/10 transition-all"
        />
        {trailing && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{trailing}</div>
        )}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 8 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2 14-5.4l-6.5-5.5c-2 1.4-4.5 2.3-7.5 2.3-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.7 2.1-2 4-3.8 5.4l6.5 5.5C42.6 35.6 44 30.1 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function LockIllustration() {
  return (
    <svg
      width="84"
      height="62"
      viewBox="0 0 84 62"
      fill="none"
      aria-hidden="true"
      className="hidden sm:block shrink-0"
    >
      {/* Orbit ellipse */}
      <ellipse
        cx="42"
        cy="32"
        rx="36"
        ry="11"
        stroke="#C4B5FD"
        strokeWidth="1"
        strokeDasharray="2 3"
        fill="none"
        transform="rotate(-14 42 32)"
      />
      {/* Padlock body */}
      <rect x="32" y="22" width="22" height="20" rx="4" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="1.4" />
      <path
        d="M37 22v-4a6 6 0 0 1 12 0v4"
        stroke="#A78BFA"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="43" cy="31" r="2" fill="#7C3AED" />
      <rect x="42" y="32" width="2" height="5" rx="1" fill="#7C3AED" />
      {/* Sparkles */}
      <path d="M14 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#C4B5FD" />
      <path d="M74 48l0.7 2.2 2.3 0.8-2.3 0.8-0.7 2.2-0.7-2.2-2.3-0.8 2.3-0.8z" fill="#A78BFA" />
    </svg>
  );
}
