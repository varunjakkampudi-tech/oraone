import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#F8FAFC]">
        <div className="flex items-center gap-3 text-[#64748B] text-sm">
          <span className="size-2 rounded-full bg-[#2563EB] animate-pulse" />
          Loading your workspace...
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
