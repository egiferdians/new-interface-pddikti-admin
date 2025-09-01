import { h } from "preact";
import Router from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/home/Dashboard";
import Users from "./pages/manajemen-akses/users/Index";

export default function App() {
  // Ambil status login dari localStorage ketika app start
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("auth") ?? "false");
    } catch {
      return false;
    }
  });

  // Simpan ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Guard rute global: redirect sesuai status login
  const handleRoute = (e) => {
    const url = e.url || "/";
    
    if (url === "/login" && isAuthenticated) {
      route("/", true); // sudah login → paksa ke dashboard
    }
    if (url === "/" && !isAuthenticated) {
      route("/login", true); // belum login → paksa ke login
    }
  };

  return (
    <Router onChange={handleRoute}>
      <Login
        path="/login"
        onLogin={() => setIsAuthenticated(true)}
        isAuthenticated={isAuthenticated}
      />
      <Dashboard
        path="/"
        isAuthenticated={isAuthenticated}
        onLogout={() => setIsAuthenticated(false)}
      />
      <Users
        path="/manajemen-akses/users"
        isAuthenticated={isAuthenticated}
        onLogout={() => setIsAuthenticated(false)}
      />
    </Router>
  );
}
