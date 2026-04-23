import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCustomerModal from "../components/AddCustomerModal";


export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  // Load customers (moved OUTSIDE useEffect)
const loadCustomers = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/customers/?search=${debouncedSearch}&ordering=first_name`
    );

    const data = response.data.results || response.data;
    setCustomers(data);
  } catch (err) {
    console.error(err);
    setError("Failed to load customers");
  } finally {
    setLoading(false);
  }
};

// Debounced search effect
useEffect(() => {
  loadCustomers();
}, [debouncedSearch]);

// Add customer
const addCustomer = async (data) => {
  await axios.post("http://localhost:8000/api/customers/", data);
  loadCustomers(); // refresh list
};


  // Debounce the search input (wait 400ms after typing stops)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);


  const highlightMatch = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "ig");
  return text.replace(regex, "<strong>$1</strong>");
};




  if (loading) return <div className="text-gray-600">Loading customers...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm transition"
      >
        + Add Customer
      </button>

      <div className="bg-white shadow rounded p-4">
        {customers.length === 0 ? (
          <p className="text-gray-600">No customers found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {customers.map((cust) => (
             <li
                key={cust.id}
                className="py-3 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => navigate(`/customers/${cust.id}`)}
              >
                <div
                  className="font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(
                      `${cust.first_name} ${cust.last_name}`,
                      debouncedSearch
                    ),
                  }}
                />

                <div
                  className="text-gray-600 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(cust.email, debouncedSearch),
                    }}
                />
              </li>

            ))}
          </ul>

        )}
      </div>
      {showAddModal && (
        <AddCustomerModal
          onClose={() => setShowAddModal(false)}
          onSave={addCustomer}
        />
      )}

    </div>
  );
}


