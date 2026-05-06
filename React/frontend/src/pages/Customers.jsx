import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedRow, setSelectedRow] = useState(null);






  useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(search);
  }, 400);

  return () => clearTimeout(handler);
}, [search]);


  const [ordering, setOrdering] = useState("-id"); // default: newest first

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [isLeaving, setIsLeaving] = useState(false);


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, ordering]);

  // Load customers
useEffect(() => {
  const loadCustomers = async () => {
    setLoading(true); // <— IMPORTANT

    try {
      const response = await axios.get(
        `http://localhost:8000/api/customers/?search=${debouncedSearch}&ordering=${ordering}&page=${currentPage}`
      );

      const data = response.data;

      setCustomers(data.results || data);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (err) {
      console.error("Error loading customers:", err);
    } finally {
      setLoading(false); // <— CRITICAL
    }
  };

  loadCustomers();
}, [debouncedSearch, ordering, currentPage]);



const highlightMatch = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "ig");
  return text.replace(
    regex,
    `<span class="highlight-glow">$1</span>`
  );
};

const toggleSort = (field) => {
  if (ordering === field) {
    setOrdering(`-${field}`); // ascending → descending
  } else {
    setOrdering(field); // default to ascending
  }
};

const sortIcon = (field) => {
  if (ordering === field) return "▲";      // ascending
  if (ordering === `-${field}`) return "▼"; // descending
  return "";                                // no sort yet
};




  // Handle form input
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ADD CUSTOMER
  const handleAddCustomer = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/customers/", formData);
      setCustomers([...customers, response.data]);
      setOpenAdd(false);
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (cust) => {
    setSelectedCustomer(cust);
    setFormData({
      first_name: cust.first_name,
      last_name: cust.last_name,
      email: cust.email,
      phone: cust.phone
    });
    setOpenEdit(true);
  };

  // EDIT CUSTOMER
  const handleEditCustomer = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/customers/${selectedCustomer.id}/`,
        formData
      );

      setCustomers(
        customers.map((c) => (c.id === selectedCustomer.id ? response.data : c))
      );

      setOpenEdit(false);
    } catch (err) {
      console.error("Error editing customer:", err);
    }
  };

  // OPEN DELETE MODAL
  const openDeleteModal = (cust) => {
    setSelectedCustomer(cust);
    setOpenDelete(true);
  };

  // DELETE CUSTOMER
  const handleDeleteCustomer = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/customers/${selectedCustomer.id}/`
      );

      setCustomers(customers.filter((c) => c.id !== selectedCustomer.id));
      setOpenDelete(false);
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  if (loading) return <h2 className="text-xl">Loading customers...</h2>;

  return (
    <div className={isLeaving ? "animate-fadeOut" : "animate-fadeIn"}>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      {/* ADD BUTTON */}
      <button
        onClick={() => {
          setFormData({ first_name: "", last_name: "", email: "", phone: "" });
          setOpenAdd(true);
        }}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add Customer
      </button>
        {/* SEARCH & SORT */}
      <div className="flex gap-3 mb-4">

  {/* SEARCH + X BUTTON */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 pr-10 border rounded shadow-sm focus:ring focus:ring-blue-200"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* SORT DROPDOWN */}
          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            className="px-3 py-2 border rounded shadow-sm"
          >
            <option value="first_name">Name A–Z</option>
            <option value="-first_name">Name Z–A</option>
            <option value="-id">Newest</option>
            <option value="id">Oldest</option>
          </select>

        </div>


      {/* TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th
                className="cursor-pointer select-none"
                onClick={() => toggleSort("first_name")}
              >
                Name {sortIcon("first_name")}
              </th>

              <th
                className="cursor-pointer select-none"
                onClick={() => toggleSort("email")}
              >
                Email {sortIcon("email")}
              </th>

              <th
                className="cursor-pointer select-none"
                onClick={() => toggleSort("phone")}
              >
                Phone {sortIcon("phone")}
              </th>

              <th>Actions</th>
            </tr>
          </thead>


          <tbody>
            {customers.map((cust) => (
             <tr
              key={cust.id}
             onClick={() => {
                setSelectedRow(cust.id);
                setIsLeaving(true);

                setTimeout(() => {
                  navigate(`/customers/${cust.id}`);
                }, 250); // match fadeOut duration
              }}

              className={`
                cursor-pointer
                transition-colors duration-200
                ${selectedRow === cust.id ? "bg-blue-50" : "hover:bg-gray-50"}
              `}
            >


                <td
                  className="p-4"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(
                      `${cust.first_name} ${cust.last_name}`,
                      debouncedSearch
                    ),
                  }}
                />
                <td
                  className="p-4"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(cust.email, debouncedSearch),
                  }}
                />

                <td
                  className="p-4"
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(cust.phone, debouncedSearch),
                  }}
                />

                <td className="p-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/customers/${cust.id}`);
                    }}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(cust);
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(cust);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>

      {/* ADD MODAL */}
      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <h2 className="text-xl font-bold mb-4">Add Customer</h2>

        <div className="flex flex-col gap-3">
          <input className="border p-2 rounded" placeholder="First Name"
            value={formData.first_name}
            onChange={(e) => updateField("first_name", e.target.value)}
          />
          <input className="border p-2 rounded" placeholder="Last Name"
            value={formData.last_name}
            onChange={(e) => updateField("last_name", e.target.value)}
          />
          <input className="border p-2 rounded" placeholder="Email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          <input className="border p-2 rounded" placeholder="Phone"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>

        <button
          onClick={handleAddCustomer}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </Modal>

      {/* EDIT MODAL */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <h2 className="text-xl font-bold mb-4">Edit Customer</h2>

        <div className="flex flex-col gap-3">
          <input className="border p-2 rounded" placeholder="First Name"
            value={formData.first_name}
            onChange={(e) => updateField("first_name", e.target.value)}
          />
          <input className="border p-2 rounded" placeholder="Last Name"
            value={formData.last_name}
            onChange={(e) => updateField("last_name", e.target.value)}
          />
          <input className="border p-2 rounded" placeholder="Email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          <input className="border p-2 rounded" placeholder="Phone"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>

        <button
          onClick={handleEditCustomer}
          className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Update
        </button>
      </Modal>

      {/* DELETE MODAL */}
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Customer</h2>

        <p>Are you sure you want to delete  
          <strong> {selectedCustomer?.first_name} {selectedCustomer?.last_name}</strong>?
        </p>

        <button
          onClick={handleDeleteCustomer}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </Modal>
    </div>
  );
}
