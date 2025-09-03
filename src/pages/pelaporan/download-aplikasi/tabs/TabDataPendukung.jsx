import { h } from "preact";
import * as Icons from "lucide-react";

export default function TabDataPendukung() {
    const data = [
        { id: 1, title: "Laporan Keuangan 2025", file: "/files/laporan-2025.pdf" },
        { id: 2, title: "Panduan Pengguna", file: "/files/panduan.pdf" },
        { id: 3, title: "Rencana Proyek", file: "/files/proyek.pdf" },
    ];
  return (
    <div className="box-border">
        <div className="min-h-screen bg-gray-50">
        <div className="mx-auto">

            <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm sm:text-base">
                    <th className="px-4 py-3">Judul</th>
                    <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
                </thead>
                <tbody>
                {data.map((doc) => (
                    <tr key={doc.id} className="border-t hover:bg-gray-50">
                    {/* Kolom Judul */}
                    <td className="px-4 py-3 flex items-center gap-2">
                        <Icons.FileText size={18} className="text-red-600" />
                        <span className="text-gray-800 text-sm sm:text-base">{doc.title}</span>
                    </td>

                    {/* Kolom Aksi */}
                    <td className="px-4 py-3 text-center">
                        <div className="relative group inline-block">
                            <a
                            href={doc.file}
                            download
                            className="hover:bg-blue-50 hover:scale-105"
                            aria-label="Download"
                            >
                            <Icons.Download size={18} className="text-blue-600" />
                            </a>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 
                                            hidden group-hover:block 
                                            bg-gray-800 text-white text-xs rounded px-2 py-1 shadow 
                                            transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                            Download File
                            </div>
                        </div>
                        </td>

                </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
  );
}
