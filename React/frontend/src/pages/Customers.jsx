import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCustomerModal from "../components/AddCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";
import DeleteCustomerModal from "../components/DeleteCustomerModal";

export default function Customers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // -----------------------------
  // Debounce Search
  // -----------------------------
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  // -----------------------------
  // Load Customers
  // -----------------------------
  const loadCustomers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/customers/?search=${debouncedSearch}&ordering=first_name`
      );

      const data = response.data.results || response.data;
      setCustomers(data);
    } catch (err) {
      console.error("Failed to load customers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [debouncedSearch]);

  // -----------------------------
  // Update Customer
  // -----------------------------
  const updateCustomer = async (updatedData) => {
    await axios.put(
      `http://localhost:8000/api/customers/${selectedCustomer.id}/`,
      updatedData
    );
    loadCustomers();
  };

  // -----------------------------
  // Delete Customer
  // -----------------------------
  const deleteCustomer = async () => {
    await axios.delete(
      `http://localhost:8000/api/customers/${selectedCustomer.id}/`
    );
    setShowDeleteModal(false);
    loadCustomers();
  };

  const addCustomer = async (data) => {
  await axios.post("http://localhost:8000/api/customers/", data);
  loadCustomers();
};


  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="p-6 bg-white shadow rounded">
      <button
        onClick={() => setShowAddModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add Customer
      </button>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>

        <input
          type="text"
          placeholder="Search customers..."
          className="border px-3 py-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading */}
      {loading && <div className="text-gray-600">Loading customers...</div>}

      {/* Empty State */}
      {!loading && customers.length === 0 && (
        <div className="text-gray-600">No customers found.</div>
      )}

      {/* Table */}
      {!loading && customers.length > 0 && (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {customers.map((cust) => (
              <tr key={cust.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 cursor-pointer"
                    onClick={() => navigate(`/customers/${cust.id}`)}>
                  {cust.first_name} {cust.last_name}
                </td>

                <td className="px-4 py-3">{cust.email}</td>
                <td className="px-4 py-3">{cust.phone}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      cust.status === "active"
                        ? "bg-green-100 text-green-700"
                        : cust.status === "inactive"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {cust.status}
                  </span>
                </td>

                {/* ⭐ Actions */}
                <td className="px-4 py-3 text-right space-x-3 flex justify-end">

                  {/* View */}
                  <button
                    onClick={() => navigate(`/customers/${cust.id}`)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => {
                      setSelectedCustomer(cust);
                      setShowEditModal(true);
                    }}
                    className="text-yellow-600 hover:text-yellow-800"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M11 5h2m-1-1v2m-7 7l4 4m0 0l8-8m-8 8H5m4 0v-4" />
                    </svg>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      setSelectedCustomer(cust);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m5 0H6" />
                    </svg>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modals */}
      {showEditModal && (
        <EditCustomerModal
          customer={selectedCustomer}
          onClose={() => setShowEditModal(false)}
          onSave={updateCustomer}
        />
      )}

      {showDeleteModal && (
        <DeleteCustomerModal
          customer={selectedCustomer}
          onClose={() => setShowDeleteModal(false)}
          onDelete={deleteCustomer}
        />
      )}

      {showAddModal && (
      <AddCustomerModal
        onClose={() => setShowAddModal(false)}
        onSave={addCustomer}
      />
    )}

    </div>
  );
}
