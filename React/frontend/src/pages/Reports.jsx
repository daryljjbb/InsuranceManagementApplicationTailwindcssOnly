import { useState } from "react";
import Breadcrumbs from "../components/navigation/Breadcrumbs";
import SuspenseReport from "../pages/reports/SuspenseReport";
import ExpirationsReport from "../pages/reports/ExpirationsReport";
import RenewalsReport from "../pages/reports/RenewalsReport";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("suspense");

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Dashboard", to: "/" },
          { label: "Reports" }
        ]}
      />

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Generated Reports</h1>
        <p className="text-gray-600">View and export system-generated reports</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <ReportTab
          label="Suspense Report"
          id="suspense"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <ReportTab
          label="Expirations Report"
          id="expirations"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <ReportTab
          label="Renewals Report"
          id="renewals"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Tab Content */}
      {activeTab === "suspense" && <SuspenseReport />}
      {activeTab === "expirations" && <ExpirationsReport />}
      {activeTab === "renewals" && <RenewalsReport />}
    </div>
  );
}

/* ---------------- Tabs Component ---------------- */

function ReportTab({ label, id, activeTab, setActiveTab }) {
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`pb-2 px-1 text-sm font-medium transition border-b-2 ${
        isActive
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
