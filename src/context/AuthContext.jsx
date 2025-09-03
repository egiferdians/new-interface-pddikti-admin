import { createContext } from 'preact';
import { useState, useContext, useEffect } from 'preact/hooks';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    setAccessToken(data.access_token);
  }

  async function refreshToken() {
    const res = await fetch("http://localhost:4000/api/refresh", {
      method: "POST",
      credentials: "include"
    });
    if (!res.ok) throw new Error("Refresh failed");
    const data = await res.json();
    setAccessToken(data.access_token);
  }

  async function logout() {
    await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include"
    });
    setAccessToken(null);
  }

  // 🔄 Cek session saat halaman pertama kali load
  useEffect(() => {
    (async () => {
      try {
        await refreshToken();
      } catch (err) {
        console.log("No active session");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ⏰ Auto-refresh access token tiap 10 menit
  useEffect(() => {
    if (!accessToken) return;
    const interval = setInterval(async () => {
      try {
        await refreshToken();
        console.log("Access token refreshed automatically ✅");
      } catch (err) {
        console.log("Auto-refresh failed ❌");
      }
    }, 10 * 60 * 1000); // 10 menit

    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, refreshToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
