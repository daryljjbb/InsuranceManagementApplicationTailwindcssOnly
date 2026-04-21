import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerTable({ customers, search }) {
  const navigate = useNavigate();

  const [sortField, setSortField] = useState("full_name");
  const [sortDir, setSortDir] = useState("asc");

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

 const sorted = [...customers].sort((a, b) => {
  const getValue = (c, field) => {
    if (field === "full_name") {
      return `${c.first_name || ""} ${c.last_name || ""}`.trim().toLowerCase();
    }
    return c[field]?.toString().toLowerCase() || "";
  };

  const valA = getValue(a, sortField);
  const valB = getValue(b, sortField);

  return sortDir === "asc"
    ? valA.localeCompare(valB)
    : valB.localeCompare(valA);
});


  const highlight = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, "<mark class='bg-yellow-200'>$1</mark>");
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border-b">
          <tr>
            {["full_name", "email", "phone", "status"].map((field) => (
              <th
                key={field}
                onClick={() => toggleSort(field)}
                className="text-left px-6 py-3 font-semibold text-gray-700 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  <ArrowUpDown size={16} />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sorted.map((c) => (
            <tr
              key={c.id}
              onClick={() => navigate(`/customers/${c.id}`)}
              className="border-b hover:bg-blue-50 transition cursor-pointer"
            >
              <td
                className="px-6 py-3"
                dangerouslySetInnerHTML={{ __html: highlight(c.first_name + " " + c.last_name) }}
              />
              <td
                className="px-6 py-3"
                dangerouslySetInnerHTML={{ __html: highlight(c.email) }}
              />
              <td
                className="px-6 py-3"
                dangerouslySetInnerHTML={{ __html: highlight(c.phone) }}
              />
             <td className="px-6 py-3">
            <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                ${c.status === "active" ? "bg-green-100 text-green-700" : ""}
                ${c.status === "inactive" ? "bg-red-100 text-red-700" : ""}
                ${c.status === "lead" ? "bg-blue-100 text-blue-700" : ""}
                `}
            >
                {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
            </span>
            </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

