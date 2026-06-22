import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, formatApiError, setTokens, clearTokens, getToken } from "./api";

const AuthContext = createContext(null);

/**
 * AuthProvider — backed by AWS Cognito + DynamoDB through the FastAPI backend.
 *
 * Flow:
 *   signup → /api/auth/signup → 6-digit code emailed → /verify-email
 *   verify → /api/auth/verify → /login
 *   login  → /api/auth/login (tokens) → /api/auth/me → dashboard
 */
export function AuthProvider({ children }) {
  // user: null = checking, false = unauthenticated, object = authenticated profile
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    if (!getToken()) {
      setUser(false);
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      clearTokens();
      setUser(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const _err = (e) =>
    formatApiError(e.response?.data?.detail) || e.message || "Something went wrong.";

  const signup = async ({ name, email, password }) => {
    try {
      await api.post("/auth/signup", { name, email, password });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  };

  const verify = async ({ email, code }) => {
    try {
      await api.post("/auth/verify", { email, code });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  };

  const resend = async ({ email }) => {
    try {
      await api.post("/auth/resend", { email });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setTokens(data.access_token, data.refresh_token);
      // Fetch the canonical user profile from DynamoDB
      const me = await api.get("/auth/me");
      setUser(me.data);
      return { ok: true, user: me.data };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  };

  const forgotPassword = async ({ email }) => {
    try {
      await api.post("/auth/forgot-password", { email });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  };

  const resetPassword = async ({ email, code, new_password }) => {
    try {
      await api.post("/auth/reset-password", { email, code, new_password });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore — clearing local tokens is the source of truth */
    }
    clearTokens();
    setUser(false);
  };

  const refresh = fetchMe;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        verify,
        resend,
        login,
        forgotPassword,
        resetPassword,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
