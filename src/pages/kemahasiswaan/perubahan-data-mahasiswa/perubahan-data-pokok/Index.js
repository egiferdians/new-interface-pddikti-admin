import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import MainLayout from "@/layouts/MainLayout";
import TabDraft from "./tabs/Draft";
import TabDiusulkan from "./tabs/Diusulkan";
import TabDisetujui from "./tabs/Disetujui";
import TabDitolak from "./tabs/Ditolak";
import TabDitangguhkan from "./tabs/Ditangguhkan";
import PageHeader from "@/components/PageHeader";

export default function Index({ isAuthenticated, onLogout }) {
  const [activeTab, setActiveTab] = useState("tab-draft");

  useEffect(() => {
    if (!isAuthenticated) route("/login", true);
  }, [isAuthenticated]);

  return (
    <MainLayout onLogout={onLogout}>
        <PageHeader
            icon="UserPen"
            title="Perubahaan Data Pokok"
            subtitle="Ajuan Perubahaan Data Pokok Mahasiswa"
            actions={[
                { label: "Kembali", icon: "ArrowLeft", variant: "secondary", onClick: () => window.history.back() },
                { label: "Buat Usulan", icon: "Plus", variant: "primary", onClick: () => {} },
            ]}
        />
      <div className="my-4 bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tab Header */}
        <div className="flex border-b border-gray-300 overflow-x-auto scrollbar-hide">
          <button
            className={`flex-1 min-w-[120px] sm:min-w-0 py-3 text-sm font-medium text-center transition-colors border-b-4 focus:outline-none
              ${
                activeTab === "tab-draft"
                  ? "border-purple-700 text-purple-700 font-semibold"
                  : "border-transparent text-gray-700 font-normal"
              }`}
            onClick={() => setActiveTab("tab-draft")}
            role="tab"
            aria-selected={activeTab === "tab-draft"}
            tabIndex={activeTab === "tab-draft" ? 0 : -1}
          >
            Draft
          </button>
          <button
            className={`flex-1 min-w-[120px] sm:min-w-0 py-3 text-sm font-medium text-center transition-colors border-b-4 focus:outline-none
              ${
                activeTab === "tab-diusulkan"
                  ? "border-purple-700 text-purple-700 font-semibold"
                  : "border-transparent text-gray-700 font-normal"
              }`}
            onClick={() => setActiveTab("tab-diusulkan")}
            role="tab"
            aria-selected={activeTab === "tab-diusulkan"}
            tabIndex={activeTab === "tab-diusulkan" ? 0 : -1}
          >
            Diusulkan
          </button>
          <button
            className={`flex-1 min-w-[120px] sm:min-w-0 py-3 text-sm font-medium text-center transition-colors border-b-4 focus:outline-none
                ${
                activeTab === "tab-disetujui"
                  ? "border-purple-700 text-purple-700 font-semibold"
                  : "border-transparent text-gray-700 font-normal"
              }`}
            onClick={() => setActiveTab("tab-disetujui")}
            role="tab"
            aria-selected={activeTab === "tab-disetujui"}
            tabIndex={activeTab === "tab-disetujui" ? 0 : -1}
          >
            Disetujui
          </button>
          <button
            className={`flex-1 min-w-[120px] sm:min-w-0 py-3 text-sm font-medium text-center transition-colors border-b-4 focus:outline-none
              ${
                activeTab === "tab-ditolak"
                  ? "border-purple-700 text-purple-700 font-semibold"
                  : "border-transparent text-gray-700 font-normal"
              }`}
            onClick={() => setActiveTab("tab-ditolak")}
            role="tab"
            aria-selected={activeTab === "tab-ditolak"}
            tabIndex={activeTab === "tab-ditolak" ? 0 : -1}
          >
            Ditolak
          </button>
          <button
            className={`flex-1 min-w-[120px] sm:min-w-0 py-3 text-sm font-medium text-center transition-colors border-b-4 focus:outline-none
                ${
                activeTab === "tab-ditangguhkan"
                  ? "border-purple-700 text-purple-700 font-semibold"
                  : "border-transparent text-gray-700 font-normal"
              }`}
            onClick={() => setActiveTab("tab-ditangguhkan")}
            role="tab"
            aria-selected={activeTab === "tab-ditangguhkan"}
            tabIndex={activeTab === "tab-ditangguhkan" ? 0 : -1}
          >
            Ditangguhkan
          </button>
        </div>

        {/* Tab Panel */}
        <div
          role="tabpanel"
          aria-labelledby={activeTab}
          className="p-5 bg-gray-50 min-h-[150px] text-gray-800 text-base"
        >
          {activeTab === "tab-draft" && <TabDraft />}
          {activeTab === "tab-diusulkan" && <TabDiusulkan />}
          {activeTab === "tab-disetujui" && <TabDisetujui />}
          {activeTab === "tab-ditolak" && <TabDitolak />}
          {activeTab === "tab-ditangguhkan" && <TabDitangguhkan />}
        </div>
      </div>
    </MainLayout>
  );
}
