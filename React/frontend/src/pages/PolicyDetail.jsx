import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../components/Breadcrumbs";
import Modal from "../components/Modal";
import { safeArray } from "../utils/apiHelpers";
import PolicyInvoicesTab from "../components/PolicyInvoicesTab";
import PolicyDocumentsTab from "../components/PolicyDocumentsTab";
import CurrencyInput from "../components/CurrrencyInput";

export default function PolicyDetail() {
  const { id } = useParams(); // policy ID
  const navigate = useNavigate();

  const [policy, setPolicy] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("overview");
  const [openAddInvoice, setOpenAddInvoice] = useState(false);

  const [invoiceData, setInvoiceData] = useState({
    amount: "",
    due_date: "",
  });

  // -----------------------------
  // Load Policy + Customer + Invoices
  // -----------------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load policy
        const pol = await axios.get(
          `http://localhost:8000/api/policies/${id}/`
        );
        setPolicy(pol.data);

        // Load customer for breadcrumb
        const cust = await axios.get(
          `http://localhost:8000/api/customers/${pol.data.customer}/`
        );
        setCustomer(cust.data);

        // Load invoices for this policy
        const inv = await axios.get(
          `http://localhost:8000/api/invoices/?policy=${id}`
        );
        setInvoices(safeArray(inv.data));
      } catch (err) {
        console.error("Error loading policy:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // -----------------------------
  // Add Invoice
  // -----------------------------
  const addInvoice = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/invoices/",
        {
          ...invoiceData,
          policy: Number(id),
        }
      );

      setInvoices([...invoices, response.data]);
      setOpenAddInvoice(false);
    } catch (err) {
      console.error("Error adding invoice:", err.response?.data || err);
    }
  };

  if (loading || !policy || !customer) return <h2>Loading...</h2>;

  return (
    <div className="animate-slideIn">
      {/* ----------------------------- */}
      {/* Breadcrumbs */}
      {/* ----------------------------- */}
      <Breadcrumbs
        items={[
          { label: "Customers", to: "/customers" },
          {
            label: `${customer.first_name} ${customer.last_name}`,
            to: `/customers/${customer.id}`,
          },
          { label: `Policy ${policy.policy_number}` },
        ]}
      />

      {/* ----------------------------- */}
      {/* Header */}
      {/* ----------------------------- */}
      <h1 className="text-2xl font-bold mb-4">
        Policy #{policy.policy_number}
      </h1>

      {/* ----------------------------- */}
      {/* Modern Tab Bar */}
      {/* ----------------------------- */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: "overview", label: "Overview" },
            { key: "invoices", label: "Invoices" },
            { key: "documents", label: "Documents" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition
                ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ----------------------------- */}
      {/* OVERVIEW TAB */}
      {/* ----------------------------- */}
      {activeTab === "overview" && (
        <div className="animate-fadeIn">
          <p>
            <strong>Type:</strong> {policy.policy_type}
          </p>
          <p>
            <strong>Premium:</strong> ${policy.premium_amount}
          </p>
          <p>
            <strong>Effective:</strong> {policy.effective_date}
          </p>
          <p>
            <strong>Expires:</strong> {policy.expiration_date}
          </p>
          <p>
            <strong>Carrier:</strong> {policy.carrier || "N/A"}
          </p>
        </div>
      )}

      {/* ----------------------------- */}
      {/* INVOICES TAB */}
      {/* ----------------------------- */}
      {activeTab === "invoices" && (
        <PolicyInvoicesTab
          policyId={policy.id}
          invoices={invoices}
          setInvoices={setInvoices}
          openAddInvoice={() => setOpenAddInvoice(true)}
        />
      )}

      {/* ----------------------------- */}
      {/* DOCUMENTS TAB */}
      {/* ----------------------------- */}
      {activeTab === "documents" && (
        <PolicyDocumentsTab policyId={policy.id} />
      )}

      {/* ----------------------------- */}
      {/* ADD INVOICE MODAL */}
      {/* ----------------------------- */}
      <Modal open={openAddInvoice} onClose={() => setOpenAddInvoice(false)}>
        <h2 className="text-xl font-bold mb-4">Add Invoice</h2>

        <CurrencyInput
          className="border p-2 rounded w-full mb-3"
          value={invoiceData.amount}
          onChange={(val) =>
            setInvoiceData({ ...invoiceData, amount: val })
          }
        />


        <input
          type="date"
          className="border p-2 rounded w-full mb-3"
          value={invoiceData.due_date}
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, due_date: e.target.value })
          }
        />

        <button
          onClick={addInvoice}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </Modal>
    </div>
  );
}
