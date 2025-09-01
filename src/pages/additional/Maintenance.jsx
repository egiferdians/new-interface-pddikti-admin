import { h } from "preact";
import * as Icons from "lucide-react";

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-800 text-white px-6">
      {/* Icon animasi */}
      <div className="mb-6 animate-bounce">
        <Icons.TrafficCone className="w-16 h-16 text-yellow-300" />
      </div>

      {/* Judul */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Sedang Dalam Perbaikan 🚧
      </h1>

      {/* Deskripsi */}
      <p className="text-lg md:text-xl text-white/80 text-center max-w-xl mb-8">
        Kami sedang melakukan maintenance untuk meningkatkan layanan kami.
        Silahkan kembali lagi nanti. Terima kasih atas pengertian Anda 🙏
      </p>

      {/* Tombol Aksi */}
      {/* <div className="flex gap-4">
        <a
          href="/"
          className="px-5 py-2 rounded-lg bg-white text-indigo-700 font-semibold shadow hover:bg-gray-100 transition"
        >
          Kembali ke Beranda
        </a>
        <a
          href="mailto:support@domain.com"
          className="px-5 py-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold shadow hover:bg-yellow-300 transition"
        >
          Hubungi Kami
        </a>
      </div> */}

      {/* Footer kecil */}
      <p className="mt-10 text-sm text-white/60">
        Copyright &copy; 2013 - 2024 Kementerian Pendidikan Tinggi, Sains, dan Teknologi
      </p>
            <p class="text-xs text-white/60 mt-1">v3.0.0</p>
    </div>
  );
}