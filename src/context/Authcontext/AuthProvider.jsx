import React, { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';

const LS_TOKEN_KEY = 'wastewise_token';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function apiFetch(path, { token, ...init } = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${apiBaseUrl}${path}`, { ...init, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || `Request failed: ${res.status}`;
    throw new Error(message);
  }
  return data;
}

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(LS_TOKEN_KEY) || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMe = async (tkn) => {
    if (!tkn) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const me = await apiFetch('/api/auth/me', { token: tkn });
      setUser(me?.user || null);
    } catch (e) {
      localStorage.removeItem(LS_TOKEN_KEY);
      setToken('');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMe(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = async (payload) => {
    setLoading(true);
    try {
      const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      localStorage.setItem(LS_TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (identifier, password) => {
    setLoading(true);
    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      });
      localStorage.setItem(LS_TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    localStorage.removeItem(LS_TOKEN_KEY);
    setToken('');
    setUser(null);
  };

  const authInfo = useMemo(
    () => ({
      user,
      token,
      loading,
      registerUser,
      signInUser,
      logOut,
      apiFetch: (path, init) => apiFetch(path, { ...init, token }),
      reloadMe: () => loadMe(token),
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;