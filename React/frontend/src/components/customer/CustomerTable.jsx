// src/components/customers/CustomerTable.jsx
export default function CustomerTable({ customers, onEdit, onDelete }) {
  const renderStatusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "active":
        return <span className={`${base} bg-green-100 text-green-700`}>Active</span>;
      case "inactive":
        return <span className={`${base} bg-gray-100 text-gray-700`}>Inactive</span>;
      case "lead":
      default:
        return <span className={`${base} bg-blue-100 text-blue-700`}>Lead</span>;
    }
  };

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden mt-4">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {customers.map((c) => (
          <tr key={c.id} className="hover:bg-gray-50 transition">
            <td className="px-4 py-3 font-medium">
              {c.first_name} {c.last_name}
            </td>
            <td className="px-4 py-3">{c.email}</td>
            <td className="px-4 py-3">{c.phone}</td>
            <td className="px-4 py-3">{renderStatusBadge(c.status)}</td>
            <td className="px-4 py-3 text-right space-x-3 flex justify-end">
              <button
                onClick={() => onEdit(c)}
                className="text-blue-600 hover:text-blue-800"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(c)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
