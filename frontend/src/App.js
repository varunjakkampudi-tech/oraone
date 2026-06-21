import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth";

// Layouts
import MarketingLayout from "@/layouts/MarketingLayout";
import AuthLayout from "@/layouts/AuthLayout";
import OnboardingLayout from "@/layouts/OnboardingLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Marketing pages
import Home from "@/pages/marketing/Home";
import Products from "@/pages/marketing/Products";
import Solutions from "@/pages/marketing/Solutions";
import IntegrationsMkt from "@/pages/marketing/Integrations";
import Templates from "@/pages/marketing/Templates";
import Pricing from "@/pages/marketing/Pricing";
import Documentation from "@/pages/marketing/Documentation";
import CaseStudies from "@/pages/marketing/CaseStudies";
import About from "@/pages/marketing/About";
import Contact from "@/pages/marketing/Contact";
import { Privacy, Terms, Cookie, DataDeletion } from "@/pages/legal/Legal";
import NotFound from "@/pages/NotFound";

// Auth pages
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import { VerifyEmail, ForgotPassword, ResetPassword } from "@/pages/auth/Recovery";

// Onboarding
import Step1Agent from "@/pages/onboarding/Step1Agent";
import Step2Business from "@/pages/onboarding/Step2Business";
import Step3Channels from "@/pages/onboarding/Step3Channels";

// Dashboard
import Overview from "@/pages/dashboard/Overview";
import Agents from "@/pages/dashboard/Agents";
import AgentCreate from "@/pages/dashboard/AgentCreate";
import AgentBuilder from "@/pages/dashboard/AgentBuilder";
import Conversations from "@/pages/dashboard/Conversations";
import Leads from "@/pages/dashboard/Leads";
import Analytics from "@/pages/dashboard/Analytics";
import KnowledgeBase from "@/pages/dashboard/KnowledgeBase";
import IntegrationsDash from "@/pages/dashboard/Integrations";
import Team from "@/pages/dashboard/Team";
import Settings from "@/pages/dashboard/Settings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-right" richColors closeButton />
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
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
