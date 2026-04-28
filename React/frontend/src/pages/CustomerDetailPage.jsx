import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../components/Breadcrumbs";
import Tabs from "../components/ui/Tabs";
import { useSearchParams } from "react-router-dom";
import { Home, Users, User, FileText } from "lucide-react";


import InvoiceAccordion from "../components/InvoiceAccordion";

import EditPolicyModal from "../components/policies/EditPolicyModal";
import AddPolicyModal from "../components/policies/AddPolicyModal";
import DeletePolicyModal from "../components/policies/DeletePolicyModal";
import RenewalReminderList from "../components/policies/RenewalReminderList";



export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showDeletePolicyModal, setShowDeletePolicyModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showEditPolicyModal, setShowEditPolicyModal] = useState(false);
  const [showAddPolicyModal, setShowAddPolicyModal] = useState(false);

  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);



  const tabLabels = {
  overview: "Overview",
  policies: "Policies",
  invoices: "Invoices",
  renewals: "Renewals",
  notes: "Notes",
};




  // -----------------------------
  // Load Customer
  // -----------------------------
 // -----------------------------
// Load Single Customer
// -----------------------------
const loadCustomer = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/customers/${id}/`
    );
    setCustomer(response.data);
  } catch (err) {
    console.error(err);
    setError("Failed to load customer");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadCustomer();
}, [id]);

  // -----------------------------
  // Load Policies
  // -----------------------------
const loadPolicies = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/customers/${id}/policies/`
    );
    setPolicies(response.data);
  } catch (err) {
    console.error("Failed to load policies", err);
  }
};

useEffect(() => {  
  loadPolicies();
}, [id]);

  const updateCustomer = async (updatedData) => {
  await axios.put(`http://localhost:8000/api/customers/${id}/`, updatedData);
  loadCustomer(); // refresh detail page
};

const deleteCustomer = async () => {
  await axios.delete(`http://localhost:8000/api/customers/${id}/`);
  navigate("/customers"); // redirect after delete
};

const deletePolicy = async () => {
  await axios.delete(`http://localhost:8000/api/policies/${selectedPolicy.id}/`);
  setShowDeletePolicyModal(false);
  await loadPolicies(); // refresh policies list
};

const addPolicy = async (data) => {
  await axios.post(
    `http://localhost:8000/api/customers/${id}/policies/`,
    data
  );

  await loadPolicies();   // refresh policies instantly
  setShowAddPolicyModal(false);  // close Add modal
};

const updatePolicy = async (updatedData) => {
  await axios.put(
    `http://localhost:8000/api/policies/${selectedPolicy.id}/`,
    updatedData
  );

  await loadPolicies(); // refresh policies
  setShowEditPolicyModal(false); // ⭐ close EDIT modal (correct)
};


const renderPolicyStatus = (status) => {
  const base = "px-2 py-1 rounded-full text-xs font-semibold capitalize";

  switch (status) {
    case "active":
      return <span className={`${base} bg-green-100 text-green-700`}>Active</span>;
    case "expired":
      return <span className={`${base} bg-red-100 text-red-700`}>Expired</span>;
    case "cancelled":
      return <span className={`${base} bg-gray-200 text-gray-700`}>Cancelled</span>;
    default:
      return <span className={`${base} bg-blue-100 text-blue-700`}>{status}</span>;
  }
};




  // -----------------------------
  // Loading / Error States
  // -----------------------------
  if (loading) return <div className="text-gray-600">Loading customer...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!customer) return <div>No customer found.</div>;

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="bg-white shadow rounded p-6">

      {/* Breadcrumbs */}
     <Breadcrumbs
      items={[
        { label: "Dashboard", to: "/", icon: Home },
        { label: "Customers", to: "/customers", icon: Users },
        { label: `${customer.first_name} ${customer.last_name}`, to: `/customers/${id}`, icon: User },
        { label: tabLabels[activeTab], icon: FileText, active: true } // ⭐ highlight this one
      ]}
    />




      {/* Back Button */}
      <button
        onClick={() => navigate("/customers")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded shadow-sm transition"
      >
        ← Back to Customers
      </button>

      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">
        {customer.first_name} {customer.last_name}
      </h2>

      {/* Tabs */}
      <Tabs
        tabs={[
          {
            key: "overview",
            label: "Overview",
            content: (
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Address:</strong> {customer.address}</p>
                <p><strong>Notes:</strong> {customer.notes || "No notes"}</p>
              </div>
            ),
          },
          {
            key: "policies",
            label: "Policies",
            content: (
              <div className="space-y-3">
                <button
                onClick={() => setShowAddPolicyModal(true)}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                + Add Policy
              </button>
               
                {policies.length === 0 ? (
                  <p className="text-gray-600">No policies found.</p>
                ) : (
                 <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden mt-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Policy #</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Effective</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Expires</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Premium</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Carrier</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {policies.map((pol) => (
                        <tr key={pol.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3">
                            <span
                              className={`
                                px-2 py-1 rounded text-xs font-semibold capitalize
                                ${
                                  pol.policy_type === "auto"
                                    ? "bg-blue-100 text-blue-700"
                                    : pol.policy_type === "home"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-purple-100 text-purple-700"
                                }
                              `}
                            >
                              {pol.policy_type}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium">#{pol.policy_number}</td>
                          <td className="px-4 py-3">{pol.effective_date}</td>
                          <td className="px-4 py-3">{pol.expiration_date}</td>
                          <td className="px-4 py-3">${pol.premium_amount}</td>
                          <td className="px-4 py-3">{pol.carrier || "—"}</td>
                          <td className="px-4 py-3">{renderPolicyStatus(pol.status)}</td>
                          {/* ⭐ Actions */}
                          <td className="px-4 py-3 text-right space-x-3 flex justify-end">

                            {/* Edit */}
                            <button
                              onClick={() => {
                                setSelectedPolicy(pol);
                                setShowEditPolicyModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit Policy"
                            >
                              ✏️
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => {
                                setSelectedPolicy(pol);
                                setShowDeletePolicyModal(true);
                              }}
                              className="text-red-600 hover:text-red-800"
                              title="Delete Policy"
                            >
                              🗑
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                )}
              </div>
            ),
          },
          {
          key: "invoices",
          label: "Invoices",
          content: (
            <div className="space-y-4">

              {policies.length === 0 ? (
                <p className="text-gray-600">No policies found, so no invoices can be created.</p>
              ) : (
                <div className="space-y-4">
                  {policies.map((pol) => (
                    <InvoiceAccordion
                      key={pol.id}
                      policy={pol}
                      customerId={id}
                    />
                  ))}
                </div>
              )}

            </div>
          ),
        },
        {
          key: "renewals",
          label: "Renewal Reminders",
          content: <RenewalReminderList />
        },


          {
            key: "notes",
            label: "Notes",
            content: (
              <div className="text-gray-700">
                <p>Notes editor coming soon.</p>
              </div>
            ),
          },
        ]}
      />
      {showDeletePolicyModal && (
        <DeletePolicyModal
          policy={selectedPolicy}
          onClose={() => setShowDeletePolicyModal(false)}
          onDelete={deletePolicy}
        />
      )}

      {showEditPolicyModal && (
        <EditPolicyModal
          policy={selectedPolicy}
          onClose={() => setShowEditPolicyModal(false)}
          onSave={updatePolicy}
        />
      )}

      {showAddPolicyModal && (
      <AddPolicyModal
        customerId={id}
        onClose={() => setShowAddPolicyModal(false)}
        onSave={addPolicy}
      />
    )}

    </div>
  );
}
