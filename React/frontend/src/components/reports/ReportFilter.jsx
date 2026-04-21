import { useState } from "react";
import { Search } from "lucide-react";

export default function ReportFilters({ filters, setFilters }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-wrap items-end gap-4">

      {/* Search */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Search</label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-2 border rounded-lg w-48"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
      </div>

      {/* Start Date */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Start Date</label>
        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">End Date</label>
        <input
          type="date"
          className="border rounded-lg px-3 py-2"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </div>

      {/* Clear Button */}
      <button
        className="ml-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        onClick={() =>
          setFilters({ search: "", startDate: "", endDate: "" })
        }
      >
        Clear
      </button>
    </div>
  );
}
