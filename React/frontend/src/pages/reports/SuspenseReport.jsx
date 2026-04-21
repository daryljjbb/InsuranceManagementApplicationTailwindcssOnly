import { useState, useMemo } from "react";
import ReportFilters from "../../components/reports/ReportFilter";
import ReportTable from "../../components/reports/ReportTable";

export default function SuspenseReport() {
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
  });

  const data = [
    { id: 1, customer: "Sarah Lee", amount: "$120.00", date: "2026-04-20" },
    { id: 2, customer: "John Smith", amount: "$85.00", date: "2026-04-18" },
  ];

  // Filtering Logic
  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch =
        row.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
        row.amount.toLowerCase().includes(filters.search.toLowerCase());

      const afterStart =
        !filters.startDate || row.date >= filters.startDate;

      const beforeEnd =
        !filters.endDate || row.date <= filters.endDate;

      return matchesSearch && afterStart && beforeEnd;
    });
  }, [filters, data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-semibold">Suspense Report</h2>

      <ReportFilters filters={filters} setFilters={setFilters} />

      <ReportTable
        headers={["Customer", "Amount", "Date"]}
        rows={filtered.map((row) => [row.customer, row.amount, row.date])}
      />
    </div>
  );
}
