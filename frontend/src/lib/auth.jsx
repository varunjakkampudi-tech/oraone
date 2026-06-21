import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, formatApiError, setTokens, clearTokens, getToken } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = checking, false = unauthenticated, object = authed
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    // Skip the network call entirely when there's no token — saves a 401 round-trip.
    if (!getToken()) {
      setUser(false);
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      // Invalid/expired token — wipe it so we don't keep retrying.
      clearTokens();
      setUser(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const persistTokens = (data) => {
    if (data && (data.access_token || data.refresh_token)) {
      setTokens(data.access_token, data.refresh_token);
    }
  };

  const stripTokens = (data) => {
    if (!data) return data;
    // Don't keep the raw tokens on the user object in React state.
    const { access_token: _a, refresh_token: _r, ...rest } = data;
    void _a;
    void _r;
    return rest;
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      persistTokens(data);
      const u = stripTokens(data);
      setUser(u);
      return { ok: true, user: u };
    } catch (e) {
      return { ok: false, error: formatApiError(e.response?.data?.detail) || e.message };
    }
  };

  const register = async (payload) => {
    try {
      const { data } = await api.post("/auth/register", payload);
      persistTokens(data);
      const u = stripTokens(data);
      setUser(u);
      return { ok: true, user: u };
    } catch (e) {
      return { ok: false, error: formatApiError(e.response?.data?.detail) || e.message };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore network error on logout */
    }
    clearTokens();
    setUser(false);
  };

  const refresh = fetchMe;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
