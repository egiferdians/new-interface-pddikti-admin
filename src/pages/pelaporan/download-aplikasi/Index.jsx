import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import MainLayout from "@/layouts/MainLayout";
import TabAplikasi from "./tabs/TabAplikasi";
import TabDataPendukung from "./tabs/TabDataPendukung";
import PageHeader from "@/components/PageHeader";

export default function Index({ isAuthenticated, onLogout }) {
  const [activeTab, setActiveTab] = useState("tab-aplikasi");

  useEffect(() => {
    if (!isAuthenticated) route("/login", true);
  }, [isAuthenticated]);

  return (
    <MainLayout onLogout={onLogout}>
        <PageHeader
            icon="UserPen"
            title="Download Aplikasi"
            actions={[
                { label: "Kembali", icon: "ArrowLeft", variant: "secondary", onClick: () => window.history.back() },
            ]}
        />
      <div className="my-4 bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tab Header */}
        <div className="flex border-b border-gray-300 overflow-x-auto scrollbar-hide">
          <button
            className={`flex-1 min-w-[120px] sm:min-w-0 py-3 text-sm font-medium text-center transition-colors border-b-4 focus:outline-none
              ${
                activeTab === "tab-aplikasi"
                  ? "border-purple-700 text-purple-700 font-semibold"
                  : "border-transparent text-gray-700 font-normal"
              }`}
            onClick={() => setActiveTab("tab-aplikasi")}
            role="tab"
            aria-selected={activeTab === "tab-aplikasi"}
            tabIndex={activeTab === "tab-aplikasi" ? 0 : -1}
          >
            Aplikasi
          </button>
          <button
            className={`flex-1 min-w-[120px] sm:min-w-0 py-3 text-sm font-medium text-center transition-colors border-b-4 focus:outline-none
              ${
                activeTab === "tab-data-pendukung"
                  ? "border-purple-700 text-purple-700 font-semibold"
                  : "border-transparent text-gray-700 font-normal"
              }`}
            onClick={() => setActiveTab("tab-data-pendukung")}
            role="tab"
            aria-selected={activeTab === "tab-data-pendukung"}
            tabIndex={activeTab === "tab-data-pendukung" ? 0 : -1}
          >
            Data Pendukung
          </button>
        </div>

        {/* Tab Panel */}
        <div
          role="tabpanel"
          aria-labelledby={activeTab}
          className="p-5 bg-gray-50 min-h-[150px] text-gray-800 text-base"
        >
          {activeTab === "tab-aplikasi" && <TabAplikasi />}
          {activeTab === "tab-data-pendukung" && <TabDataPendukung />}
        </div>
      </div>
    </MainLayout>
  );
}
