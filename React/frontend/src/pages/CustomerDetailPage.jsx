import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../components/Breadcrumbs";
import Tabs from "../components/ui/Tabs";
import { useSearchParams } from "react-router-dom";
import { Home, Users, User, FileText } from "lucide-react";



export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const tabLabels = {
  overview: "Overview",
  policies: "Policies",
  notes: "Notes",
};



  // -----------------------------
  // Load Customer
  // -----------------------------
  useEffect(() => {
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

    loadCustomer();
  }, [id]);

  // -----------------------------
  // Load Policies
  // -----------------------------
  useEffect(() => {
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

    loadPolicies();
  }, [id]);

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
                {policies.length === 0 ? (
                  <p className="text-gray-600">No policies found.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {policies.map((pol) => (
                      <li key={pol.id} className="py-3">
                        <div className="font-semibold">
                          {pol.policy_type} — #{pol.policy_number}
                        </div>
                        <div className="text-gray-600 text-sm">
                          Premium: ${pol.premium_amount}
                        </div>
                        <div className="text-gray-600 text-sm">
                          Effective: {pol.effective_date}
                        </div>
                        <div className="text-gray-600 text-sm">
                          Expires: {pol.expiration_date}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ),
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
    </div>
  );
}
