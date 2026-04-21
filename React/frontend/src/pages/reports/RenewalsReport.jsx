import { useState, useMemo } from "react";
import ReportFilters from "../../components/reports/ReportFilter";
import ReportTable from "../../components/reports/ReportTable";

export default function RenewalsReport() {
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
  });

  const data = [
    { id: 1, policy: "A12345", customer: "Sarah Lee", renewal: "2026-06-01" },
    { id: 2, policy: "C77889", customer: "John Smith", renewal: "2026-06-05" },
  ];

  // Filtering Logic
  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch =
        row.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
        row.policy.toLowerCase().includes(filters.search.toLowerCase());

      const afterStart =
        !filters.startDate || row.renewal >= filters.startDate;

      const beforeEnd =
        !filters.endDate || row.renewal <= filters.endDate;

      return matchesSearch && afterStart && beforeEnd;
    });
  }, [filters, data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-semibold">Renewals Report</h2>

      <ReportFilters filters={filters} setFilters={setFilters} />

      <ReportTable
        headers={["Policy #", "Customer", "Renewal Date"]}
        rows={filtered.map((row) => [row.policy, row.customer, row.renewal])}
      />
    </div>
  );
}
