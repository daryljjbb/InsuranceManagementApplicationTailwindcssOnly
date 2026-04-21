import { useState } from "react";
import CustomerSearch from "../components/CustomerSearch";
import CustomerTable from "../components/CustomerTable";
import useDebounce from "../hooks/useDebounce";

export default function Customers() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  // Hardcoded for now — replace with Django API later
  const [customers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "555-1234", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "555-9876", status: "Inactive" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "555-4567", status: "Active" },
    { id: 4, name: "Sarah Lee", email: "sarah@example.com", phone: "555-2222", status: "Active" },
    { id: 5, name: "Chris Brown", email: "chris@example.com", phone: "555-3333", status: "Inactive" },
    { id: 6, name: "Emily Davis", email: "emily@example.com", phone: "555-4444", status: "Active" },
  ]);

  // Filter logic
  const filtered = customers.filter((c) =>
    [c.name, c.email, c.phone]
      .join(" ")
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedCustomers = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      <CustomerSearch search={search} setSearch={setSearch} />

      <CustomerTable customers={paginatedCustomers} search={debouncedSearch} />

      {/* Pagination Controls */}
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
    </div>
  );
}

