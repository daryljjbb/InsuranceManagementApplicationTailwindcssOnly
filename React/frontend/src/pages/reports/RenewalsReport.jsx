import { useState, useMemo } from "react";
import ReportFilter from "../../components/reports/ReportFilter";
import ReportTable from "../../components/reports/ReportTable";

export default function RenewalsReport() {
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    policyType: "",
    customer: "",
  });

  const data = [
    { id: 1, policy: "A12345", customer: "Sarah Lee", renewal: "2026-06-01", type: "Auto" },
    { id: 2, policy: "C77889", customer: "John Smith", renewal: "2026-06-05", type: "Home" },
  ];

  const dropdowns = [
    {
      key: "policyType",
      label: "Policy Type",
      options: [
        { value: "Auto", label: "Auto" },
        { value: "Home", label: "Home" },
        { value: "Life", label: "Life" },
      ],
    },
    {
      key: "customer",
      label: "Customer",
      options: [
        { value: "Sarah Lee", label: "Sarah Lee" },
        { value: "John Smith", label: "John Smith" },
      ],
    },
  ];

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch =
        row.customer.toLowerCase().includes(filters.search.toLowerCase()) ||
        row.policy.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType =
        !filters.policyType || row.type === filters.policyType;

      const matchesCustomer =
        !filters.customer || row.customer === filters.customer;

      const afterStart =
        !filters.startDate || row.renewal >= filters.startDate;

      const beforeEnd =
        !filters.endDate || row.renewal <= filters.endDate;

      return (
        matchesSearch &&
        matchesType &&
        matchesCustomer &&
        afterStart &&
        beforeEnd
      );
    });
  }, [filters, data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-semibold">Renewals Report</h2>

      <ReportFilter
        filters={filters}
        setFilters={setFilters}
        dropdowns={dropdowns}
      />

      <ReportTable
        headers={["Policy #", "Customer", "Type", "Renewal Date"]}
        rows={filtered.map((row) => [
          row.policy,
          row.customer,
          row.type,
          row.renewal,
        ])}
      />
    </div>
  );
}
