import { useState, useEffect } from "react";
import CustomerSearch from "../components/CustomerSearch";
import CustomerTable from "../components/CustomerTable";
import useDebounce from "../hooks/useDebounce";

export default function Customers() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  // Hardcoded for now — replace with Django API later
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "555-1234", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "555-9876", status: "Inactive" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "555-4567", status: "Active" },
  ]);

  // Filter logic
  const filtered = customers.filter((c) =>
    [c.name, c.email, c.phone]
      .join(" ")
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      <CustomerSearch search={search} setSearch={setSearch} />

      <CustomerTable customers={filtered} search={debouncedSearch} />
    </div>
  );
}
