import { useState } from "react";
import CustomerSearch from "../components/CustomerSearch";
import CustomerTable from "../components/CustomerTable";
import useDebounce from "../hooks/useDebounce";
import AddCustomerModal from "./customers/AddCustomerModal";
import useCustomers from "../hooks/useCustomers";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

   const {
    customers,
    loading,
    reload,
    error,
    ordering,
    setOrdering,
    addCustomer,
    removeCustomer,
  } = useCustomers();


  // Pagination state (your existing logic)
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // example
  const paginatedCustomers = []; // your actual data here

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
     <div className="space-y-6">

    {/* Header */}
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Customers</h1>

      <button
        onClick={() => setShowAddModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add Customer
      </button>
    </div>

    {/* Search */}
    <CustomerSearch search={search} setSearch={setSearch} />

    {/* Table */}
    <CustomerTable
      customers={customers}          // ⭐ FIXED — use real data
      search={debouncedSearch}
      removeCustomer={removeCustomer}
    />

    {/* Pagination */}
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>

    {/* Add Customer Modal */}
    {showAddModal && (
        <AddCustomerModal
            onClose={() => setShowAddModal(false)}
            addCustomer={addCustomer}
            reload={reload}   // ⭐ required
        />
     )}


  </div>
  );
}