import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Logo } from "@/components/marketing/Logo";
import { Phone, MessageSquare, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left visual panel */}
      <div className="hidden lg:flex relative flex-col bg-[#0F172A] p-12 text-white overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.45), transparent 60%)" }} />
        <div className="absolute -bottom-32 -left-32 w-[440px] h-[440px] rounded-full" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.35), transparent 60%)" }} />

        <Link to="/" className="relative z-10">
          <Logo light />
        </Link>

        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="relative mx-auto max-w-[300px]">
                <div
                  className="aspect-square rounded-[40px] grid place-items-center"
                  style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(6,182,212,0.15))", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <svg viewBox="0 0 24 24" width="120" height="120" fill="none">
                    <path d="M12 3a9 9 0 1 0 9 9" stroke="url(#g)" strokeWidth="2.4" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="3" fill="url(#g)" />
                    <defs>
                      <linearGradient id="g" x1="0" y1="0" x2="24" y2="24">
                        <stop offset="0" stopColor="#3B82F6" />
                        <stop offset="1" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="space-y-3 max-w-sm">
                {[
                  { icon: Phone, label: "AI Voice Agent" },
                  { icon: MessageSquare, label: "Chat Agent" },
                  { icon: MessageCircle, label: "WhatsApp Agent" },
                ].map((it, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="size-9 rounded-lg grid place-items-center bg-gradient-to-br from-[#3B82F6] to-[#06B6D4]">
                      <it.icon size={16} />
                    </div>
                    <span className="text-sm font-medium">{it.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xl font-semibold leading-snug">All your conversations.<br/>One smart dashboard.</p>
              </div>
            </motion.div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/45">© 2026 OraOne Technologies. All rights reserved.</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-10">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8">
              <Logo />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
