import { h } from "preact";
import * as Icons from "lucide-react";

export default function TabAplikasi() {
    const changelog = [
        { version: "1.2.0", date: "2025-09-01", changes: ["Tambah fitur dark mode", "Perbaikan bug login"] },
        { version: "1.1.0", date: "2025-08-10", changes: ["Optimasi performa", "UI lebih responsif"] },
        { version: "1.0.0", date: "2025-07-25", changes: ["Rilis awal aplikasi"] },
    ];
  return (
    <div className="box-border">
         <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full flex flex-col md:flex-row gap-6">
        
        {/* Cover Image */}
        <div className="md:w-1/2 w-full rounded-2xl overflow-hidden shadow-md">
          <img
            src="http://10.1.99.114/static/media/neo220.da1ad82c.png"
            alt="App Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info + Download + Changelog */}
        <div className="md:w-1/2 w-full flex flex-col">
          {/* Title & Release Info */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              NEO FEEDER VERSI 2023 2.2.0
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Tanggal Rilis: 3 September 2025
            </p>
          </div>

          {/* Download Button */}
          <div className="mt-4">
            <a
                href="/download/app.apk"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 text-white font-semibold rounded-xl shadow hover:bg-purple-800 transition"
            >
                <Icons.Download className="w-5 h-5" />
                Unduh Aplikasi
            </a>
          </div>

          {/* Changelog */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Changelog</h2>
            <div className="space-y-4">
                <div
                  className="p-4 bg-white rounded-xl shadow-sm border border-gray-200"
                >
                     <ul className="list-disc pl-2 text-gray-600 text-sm">
                        <li>Perbaikan output ws tanggal_lahir_ayah, tanggal_lahir_ibu pada ws GetDataLengkapMahasiswaProdi</li>
                        <li>Perbaikan saat input nilai transfer periode lampau, untuk bisa menaikkan jumlah sks diakui di history pendidikan mahasiswa dan cukup menggunakan tipe 2</li>
                        <li>Perbaikan log neofeeder</li>
                        <li>Perbaikan menu check / uncheck transkrip mahasiswa</li>
                        <li>Perbaikan input nik yang berulang pada biodata mahasiswa</li>
                        <li>Pembatasan history Pendidikan di semester pendek</li>
                        <li>Penambahan id_induk_wilayah di Web Service GetWilayah</li>
                        <li>Menonaktifkan perubahan id_pd di ws updatehistorypendidikan</li>
                        <li>Penambahan menu sinkronisasi pengguna untuk menurunkan khusus data pengguna saja</li>
                        <li>Penambahan penggunaan OTP (One Time Password) saat akan melakukan SYNC</li>
                        <li>Menonaktifkan pengisian Checkpoint 1 dan 2 di Neofeeder dan memindahkannya di pddikti-admin</li>
                        <li>Menambahkan rule jika mahasiswa memiliki aktifitas yang dapat dikonversi maka jumlah sks di AKM boleh tidak sama dengan sks di kelas, termasuk 0 sks diperbolehkan.</li>
                        <li>Perubahan aturan tipe 1 yang hanya bisa mengedit dan menghapus mahasiswa lampau, dan memindahkan input mahasiswa lampau ke pddikti-admin</li>
                        <li>Penambahan 2 ws baru yaitu GetListDaftarLampau dan KlaimMahasiswaLampau</li>
                        </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
