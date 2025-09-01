import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import MainLayout from "../../layouts/MainLayout";
import Jumlahdata from "./components/Jumlahdata";
import TabDosen from "./tabs/Dosen";
import DosenBelumS2 from "./tabs/DosenBelumS2";
import Accordion from "../../components/Accordion";

export default function Dashboard({ isAuthenticated, onLogout }) {
  const [activeTab, setActiveTab] = useState("tab-dosen");

  useEffect(() => {
    if (!isAuthenticated) route("/login", true);
  }, [isAuthenticated]);

  return (
    <MainLayout onLogout={onLogout}>
      <Jumlahdata dosenAktif='102120' mahasiswa='121312123' perguruanTinggi='1223' userAktif='22212' />
       <Accordion
          title="Surat Edaran Sekretaris Jenderal Nomor 25 Tahun 2023"
          defaultOpen={true}
        >
        Konten
      </Accordion>
      <Accordion
          title="Pendataan Implementasi Insersi Pendidikan Antikorupsi Tingkat Pendidikan Tinggi"
          defaultOpen={false}
        >
        Konten
      </Accordion>
      <Accordion
          title="Pendataan Vaksinasi PTK dan Pelaksanaan PTM"
          defaultOpen={false}
        >
        Konten
      </Accordion>
      <div className="my-4 bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tab Header */}
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors border-b-4 focus:outline-none
              ${
                activeTab === "tab-dosen"
                  ? "border-purple-700 text-purple-700 font-semibold"
                  : "border-transparent text-gray-700 font-normal"
              }`}
            onClick={() => setActiveTab("tab-dosen")}
            role="tab"
            aria-selected={activeTab === "tab-dosen"}
            tabIndex={activeTab === "tab-dosen" ? 0 : -1}
          >
            Dosen
          </button>

          <button
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors border-b-4 focus:outline-none
              ${
                activeTab === "tab-dosen-belum-s2"
                  ? "border-purple-700 text-purple-700 font-semibold"
                  : "border-transparent text-gray-700 font-normal"
              }`}
            onClick={() => setActiveTab("tab-dosen-belum-s2")}
            role="tab"
            aria-selected={activeTab === "tab-dosen-belum-s2"}
            tabIndex={activeTab === "tab-dosen-belum-s2" ? 0 : -1}
          >
            Data Dosen Belum S2
          </button>
        </div>

        {/* Tab Panel */}
        <div
          role="tabpanel"
          aria-labelledby={activeTab}
          className="p-5 bg-gray-50 min-h-[150px] text-gray-800 text-base"
        >
          {activeTab === "tab-dosen" && <TabDosen />}
          {activeTab === "tab-dosen-belum-s2" && <DosenBelumS2 />}
        </div>
      </div>
    </MainLayout>
  );
}
