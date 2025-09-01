import { h } from 'preact';
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import Breadcrumbs from "../components/Breadcrumbs";

export default function MainLayout({ children, onLogout }) {
  return (
    <>
        <Navbar onLogout={onLogout}/>
        <Topbar />
        <main style={{ padding: '1rem 1rem', maxWidth: '1200px', margin: 'auto', minHeight: 'calc(100vh - 160px)' }}>
            <Breadcrumbs />
            {children}
        </main>
        <footer class="relative text-center text-sm text-gray-600">
            <p>
            Copyright © 2013 - 2024 Kementerian Pendidikan Tinggi, Sains, dan Teknologi
            </p>
            <p class="text-xs mt-1">v3.0.0</p>
        </footer>
    </>
  );
}