import { h } from 'preact';
import { useEffect } from 'preact/hooks';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404 Not Found";
  }, []);

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-800 text-white text-white px-4">
      <h1 class="text-6xl md:text-8xl font-bold mb-4 text-white">404</h1>
      <p class="text-xl md:text-2xl mb-6">Oops! Halaman yang kamu cari tidak ditemukan.</p>
      <a 
        href="/" 
        class="px-6 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-500 transition"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
};

export default NotFoundPage;
