import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import Breadcrumbs from "../components/Breadcrumbs";
import { safeArray } from "../utils/apiHelpers";
import CustomerDocumentsTab from "../components/CustomerDocumentsTab";


export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
 const [isLeaving, setIsLeaving] = useState(false);

  const [openAddPolicy, setOpenAddPolicy] = useState(false);
 const [policyData, setPolicyData] = useState({
  policy_number: "",
  policy_type: "",
  premium_amount: "",
  effective_date: "",
  expiration_date: "",
  carrier: ""
});


 useEffect(() => {
  const loadData = async () => {
    try {
      const cust = await axios.get(`http://localhost:8000/api/customers/${id}/`);
      const pol = await axios.get(`http://localhost:8000/api/policies/?customer=${id}`);

      setCustomer(cust.data);
      setPolicies(safeArray(pol.data)); // ✅ always an array
    } catch (err) {
      console.error("Error loading customer or policies:", err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [id]);


 const addPolicy = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/policies/", {
      ...policyData,
      customer: Number(id)
    });

    setPolicies([...policies, response.data]);
    setOpenAddPolicy(false);
  } catch (err) {
    console.error("Error adding policy:", err.response?.data || err);
  }
};

const [activeTab, setActiveTab] = useState("overview");


  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="animate-slideIn">
      <Breadcrumbs
        items={[
          { label: "Customers", to: "/customers" },
          { label: customer.name }
        ]}
      />
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: "overview", label: "Overview" },
            { key: "policies", label: "Policies" },
            { key: "documents", label: "Documents" }
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

      {activeTab === "overview" && (
        <div className="animate-fadeIn">
          <h1 className="text-2xl font-bold mb-4">
            {customer.first_name} {customer.last_name}
          </h1>

          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phone}</p>
        </div>
      )}

      {activeTab === "policies" && (
  <div className="animate-fadeIn">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Policies</h2>
      <button
        onClick={() => setOpenAddPolicy(true)}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        + Add Policy
      </button>
    </div>

    <div className="bg-white shadow rounded">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-center">Policy #</th>
            <th className="p-3 text-center">Type</th>
            <th className="p-3 text-center">Premium</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {policies.length > 0 ? (
            policies.map((p, index) => (
              <tr
                key={p.id}
                className="border-b hover:bg-gray-50 opacity-0 animate-[fadeIn_0.35s_ease-out_forwards]"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <td className="p-3 text-center">{p.policy_number}</td>
                <td className="p-3 text-center">{p.policy_type}</td>
                <td className="p-3 text-center">${p.premium_amount}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => navigate(`/policy/${p.id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View Policy
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No policies found for this customer.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
{activeTab === "documents" && (
  <CustomerDocumentsTab customerId={customer.id} />
)}



        
      {/* ADD POLICY MODAL */}
      <Modal open={openAddPolicy} onClose={() => setOpenAddPolicy(false)}>
        <h2 className="text-xl font-bold mb-4">Add Policy</h2>

        <input
            className="border p-2 rounded w-full mb-3"
            placeholder="Policy Number"
            value={policyData.policy_number}
            onChange={(e) =>
            setPolicyData({ ...policyData, policy_number: e.target.value })
            }
        />

        <select
            className="border p-2 rounded w-full mb-3"
            value={policyData.policy_type}
            onChange={(e) =>
            setPolicyData({ ...policyData, policy_type: e.target.value })
            }
        >
            <option value="">Select Policy Type</option>
            <option value="auto">Auto</option>
            <option value="home">Home</option>
            <option value="life">Life</option>
        </select>

        <input
            className="border p-2 rounded w-full mb-3"
            placeholder="Premium Amount"
            value={policyData.premium_amount}
            onChange={(e) =>
            setPolicyData({ ...policyData, premium_amount: e.target.value })
            }
        />

        <input
            type="date"
            className="border p-2 rounded w-full mb-3"
            value={policyData.effective_date}
            onChange={(e) =>
            setPolicyData({ ...policyData, effective_date: e.target.value })
            }
        />

        <input
            type="date"
            className="border p-2 rounded w-full mb-3"
            value={policyData.expiration_date}
            onChange={(e) =>
            setPolicyData({ ...policyData, expiration_date: e.target.value })
            }
        />

        <input
            className="border p-2 rounded w-full mb-3"
            placeholder="Carrier (optional)"
            value={policyData.carrier}
            onChange={(e) =>
            setPolicyData({ ...policyData, carrier: e.target.value })
            }
        />

        <button
            onClick={addPolicy}
            className="px-4 py-2 bg-blue-600 text-white rounded"
        >
            Save
        </button>
     </Modal>

    </div>
  );
}
