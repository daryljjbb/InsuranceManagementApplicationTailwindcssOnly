export default function CustomerTable({ customers }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Name</th>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Email</th>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Phone</th>
            <th className="text-left px-6 py-3 font-semibold text-gray-700">Status</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr
              key={c.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-6 py-3">{c.name}</td>
              <td className="px-6 py-3">{c.email}</td>
              <td className="px-6 py-3">{c.phone}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${c.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                  `}
                >
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
