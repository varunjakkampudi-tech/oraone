import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "@/constants/testIds";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/products", label: "Products", id: NAV.productsMenu },
  { to: "/solutions", label: "Solutions", id: NAV.solutionsMenu },
  { to: "/integrations", label: "Integrations", id: NAV.integrationsLink },
  { to: "/templates", label: "Templates", id: NAV.templatesLink },
  { to: "/pricing", label: "Pricing", id: NAV.pricingLink },
  { to: "/about", label: "Company", id: NAV.companyMenu },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="border-b border-[#E2E8F0]/60 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  data-testid={l.id}
                  className={({ isActive }) =>
                    `text-sm font-medium px-3.5 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-[#2563EB] bg-[#EFF6FF]"
                        : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                data-testid={NAV.loginBtn}
                onClick={() => nav("/login")}
                className="hidden sm:inline-flex items-center text-sm font-medium text-[#475569] hover:text-[#0F172A] px-3 py-2"
              >
                Login
              </button>
              <button
                data-testid={NAV.bookDemoBtn}
                onClick={() => nav("/contact")}
                className="hidden sm:inline-flex items-center text-sm font-medium text-[#0F172A] bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] px-4 py-2 rounded-xl transition-colors"
              >
                Book Demo
              </button>
              <button
                data-testid={NAV.startFreeBtn}
                onClick={() => nav("/signup")}
                className="inline-flex items-center text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2 rounded-xl transition-all shadow-[0_4px_14px_-2px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_20px_-2px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
              >
                Start Free
              </button>
              <button
                data-testid={NAV.mobileToggle}
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-lg text-[#0F172A] hover:bg-[#F1F5F9]"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-b border-[#E2E8F0] shadow-lg"
          >
            <nav aria-label="Mobile" className="px-4 py-3 flex flex-col">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-[#0F172A] text-base font-medium"
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/login" onClick={() => setOpen(false)} className="py-3 text-[#0F172A] text-base font-medium">
                Login
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-[#0F172A] bg-white border border-[#E2E8F0]"
              >
                Book Demo
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-white bg-[#2563EB] shadow-[0_4px_14px_-2px_rgba(37,99,235,0.45)]"
              >
                Start Free
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
