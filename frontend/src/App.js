import React, { Suspense, lazy } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth";

// Layouts (kept eager — small and shared)
import MarketingLayout from "@/layouts/MarketingLayout";
import AuthLayout from "@/layouts/AuthLayout";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Home stays eager for the fastest LCP on the most-visited route
import Home from "@/pages/marketing/Home";

// Marketing — lazy
const Products = lazy(() => import("@/pages/marketing/Products"));
const Solutions = lazy(() => import("@/pages/marketing/Solutions"));
const IntegrationsMkt = lazy(() => import("@/pages/marketing/Integrations"));
const Templates = lazy(() => import("@/pages/marketing/Templates"));
const Pricing = lazy(() => import("@/pages/marketing/Pricing"));
const Documentation = lazy(() => import("@/pages/marketing/Documentation"));
const CaseStudies = lazy(() => import("@/pages/marketing/CaseStudies"));
const About = lazy(() => import("@/pages/marketing/About"));
const Contact = lazy(() => import("@/pages/marketing/Contact"));
const Privacy = lazy(() => import("@/pages/legal/Legal").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("@/pages/legal/Legal").then((m) => ({ default: m.Terms })));
const Cookie = lazy(() => import("@/pages/legal/Legal").then((m) => ({ default: m.Cookie })));
const DataDeletion = lazy(() => import("@/pages/legal/Legal").then((m) => ({ default: m.DataDeletion })));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Auth — lazy
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const VerifyEmail = lazy(() => import("@/pages/auth/Recovery").then((m) => ({ default: m.VerifyEmail })));
const ForgotPassword = lazy(() => import("@/pages/auth/Recovery").then((m) => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import("@/pages/auth/Recovery").then((m) => ({ default: m.ResetPassword })));

// Onboarding — lazy
const Step1Agent = lazy(() => import("@/pages/onboarding/Step1Agent"));
const Step2Business = lazy(() => import("@/pages/onboarding/Step2Business"));
const Step3Channels = lazy(() => import("@/pages/onboarding/Step3Channels"));

// Dashboard — lazy (large, only authenticated users see this)
const Overview = lazy(() => import("@/pages/dashboard/Overview"));
const Agents = lazy(() => import("@/pages/dashboard/Agents"));
const AgentCreate = lazy(() => import("@/pages/dashboard/AgentCreate"));
const AgentBuilder = lazy(() => import("@/pages/dashboard/AgentBuilder"));
const Conversations = lazy(() => import("@/pages/dashboard/Conversations"));
const Leads = lazy(() => import("@/pages/dashboard/Leads"));
const Analytics = lazy(() => import("@/pages/dashboard/Analytics"));
const KnowledgeBase = lazy(() => import("@/pages/dashboard/KnowledgeBase"));
const IntegrationsDash = lazy(() => import("@/pages/dashboard/Integrations"));
const Team = lazy(() => import("@/pages/dashboard/Team"));
const Settings = lazy(() => import("@/pages/dashboard/Settings"));

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="min-h-[50vh] flex items-center justify-center"
    >
      <div className="size-10 rounded-full border-2 border-[#E2E8F0] border-t-[#2563EB] animate-spin" />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-right" richColors closeButton />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              {/* Marketing */}
              <Route element={<MarketingLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/integrations" element={<IntegrationsMkt />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookie-policy" element={<Cookie />} />
                <Route path="/data-deletion" element={<DataDeletion />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Auth */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>

              {/* Onboarding */}
              <Route element={<OnboardingLayout />}>
                <Route path="/onboarding" element={<Navigate to="/onboarding/agent" replace />} />
                <Route path="/onboarding/agent" element={<Step1Agent />} />
                <Route path="/onboarding/business" element={<Step2Business />} />
                <Route path="/onboarding/channels" element={<Step3Channels />} />
              </Route>

              {/* Dashboard (protected) */}
              <Route element={<DashboardLayout />}>
                <Route path="/app" element={<Navigate to="/app/overview" replace />} />
                <Route path="/app/overview" element={<Overview />} />
                <Route path="/app/agents" element={<Agents />} />
                <Route path="/app/agents/new" element={<AgentCreate />} />
                <Route path="/app/agents/:id" element={<AgentBuilder />} />
                <Route path="/app/conversations" element={<Conversations />} />
                <Route path="/app/leads" element={<Leads />} />
                <Route path="/app/analytics" element={<Analytics />} />
                <Route path="/app/knowledge-base" element={<KnowledgeBase />} />
                <Route path="/app/integrations" element={<IntegrationsDash />} />
                <Route path="/app/team" element={<Team />} />
                <Route path="/app/settings" element={<Settings />} />
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
