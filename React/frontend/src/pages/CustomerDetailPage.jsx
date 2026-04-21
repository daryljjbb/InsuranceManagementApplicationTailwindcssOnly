import { useParams } from "react-router-dom";
import { useState } from "react";
import { OverviewTab } from "../components/customer/OverviewTab";
import { PoliciesTab } from "../components/customer/PoliciesTab";
import { InvoicesTab } from "../components/customer/InvoicesTab";
import EditCustomerModal from "../components/customer/EditCustomerModal";
import Breadcrumbs from "../components/navigation/Breadcrumbs";

export default function CustomerDetailPage() {
  const { id } = useParams();

  // Hardcoded for now — replace with Django API later
  const customer = {
    id,
    name: "John Doe",
    email: "john@example.com",
    phone: "555-1234",
    status: "Active",
    created_at: "2024-01-10",
  };

  const [activeTab, setActiveTab] = useState("overview");
  const [editOpen, setEditOpen] = useState(false);

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "policies", label: "Policies" },
    { key: "invoices", label: "Invoices" },
  ];

  return (
    <div className="space-y-6">
        <Breadcrumbs
        items={[
            { label: "Dashboard", to: "/" },
            { label: "Customers", to: "/customers" },
            { label: customer.name } // current page, no link
        ]}
        />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{customer.name}</h1>
          <p className="text-gray-600">Customer ID: {customer.id}</p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium
            ${customer.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"}
          `}
        >
          {customer.status}
        </span>
        <button
            onClick={() => setEditOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
            Edit Customer
        </button>

      </div>

      {/* Tabs */}
      <div className="border-b flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-lg font-medium relative
              ${activeTab === tab.key ? "text-blue-600" : "text-gray-600"}
            `}
          >
            {tab.label}

            {activeTab === tab.key && (
              <span className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-blue-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <OverviewTab customer={customer} />
      )}

      {activeTab === "policies" && (
        <PoliciesTab />
      )}

      {activeTab === "invoices" && (
        <InvoicesTab />
      )}
      {editOpen && (
        <EditCustomerModal
            customer={customer}
            onClose={() => setEditOpen(false)}
            onSave={(updated) => {
            console.log("Updated customer:", updated);
            setEditOpen(false);
            }}
        />
     )}

    </div>
  );
}

