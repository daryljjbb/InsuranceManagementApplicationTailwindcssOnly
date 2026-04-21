export function PoliciesTab() {
  const policies = [
    { id: 1, type: "Auto", number: "A12345", status: "Active" },
    { id: 2, type: "Home", number: "H98765", status: "Inactive" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Policies</h2>

      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Policy #</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {policies.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{p.type}</td>
              <td className="px-4 py-2">{p.number}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${p.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"}
                  `}
                >
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
