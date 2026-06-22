import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, formatApiError, setTokens, clearTokens, getToken } from "./api";
import { logoutHostedUI } from "@/lib/cognito";

const AuthContext = createContext(null);

function normalizeUser(profile) {
  if (!profile) return false;
  return {
    ...profile,
    id: profile.id || profile.userId || "",
    userId: profile.userId || profile.id || "",
    email: profile.email || "",
    name: profile.name || profile.full_name || "",
    full_name: profile.full_name || profile.name || "",
    role: profile.role || "owner",
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null=checking, false=out, object=in
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    if (!getToken()) {
      setUser(false);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      setUser(normalizeUser(data));
    } catch {
      clearTokens();
      setUser(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getToken()) {
      setUser(false);
      setLoading(false);
      return;
    }

    fetchMe();
  }, [fetchMe]);

  const _err = (e) =>
    formatApiError(e?.response?.data?.detail) || e?.message || "Something went wrong.";

  const login = useCallback(async ({ email, password } = {}) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "");

    if (!normalizedEmail || !normalizedPassword) {
      return { ok: false, error: "Please enter both email and password." };
    }

    try {
      const { data } = await api.post("/auth/login", {
        email: normalizedEmail,
        password: normalizedPassword,
      });

      setTokens(data.access_token, data.refresh_token ?? null, { persistent: true });
      await fetchMe();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  }, [fetchMe]);

  const signup = useCallback(async ({ email, password, name } = {}) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "");
    const normalizedName = String(name || "").trim();

    if (!normalizedName) {
      return { ok: false, error: "Please enter your name." };
    }
    if (!normalizedEmail || !normalizedPassword) {
      return { ok: false, error: "Please enter email and password." };
    }

    try {
      const { data } = await api.post("/auth/signup", {
        email: normalizedEmail,
        password: normalizedPassword,
        name: normalizedName,
      });
      return {
        ok: true,
        message: data?.message || "Signup successful. Please verify your email if prompted, then log in.",
      };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  }, []);

  const verify = useCallback(async ({ email, code }) => {
    try {
      await api.post("/auth/verify", { email, code });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  }, []);

  const resend = useCallback(async ({ email }) => {
    try {
      await api.post("/auth/resend", { email });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  }, []);

  const forgotPassword = useCallback(async ({ email }) => {
    try {
      await api.post("/auth/forgot-password", { email });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  }, []);

  const resetPassword = useCallback(async ({ email, code, new_password }) => {
    try {
      await api.post("/auth/reset-password", { email, code, new_password });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: _err(e) };
    }
  }, []);

  const logout = useCallback(async ({ hosted = false } = {}) => {
    try {
      if (getToken()) {
        await api.post("/auth/logout");
      }
    } catch {
      // Best-effort logout; always clear local session.
    }

    clearTokens();
    setUser(false);

    if (hosted) {
      logoutHostedUI();
    }
  }, []);

  const refresh = fetchMe;
  const refreshSession = fetchMe;
  const getCurrentUser = fetchMe;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        signup,
        verify,
        resend,
        login,
        forgotPassword,
        resetPassword,
        logout,
        refresh,
        refreshSession,
        getCurrentUser,
        fetchMe,
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
