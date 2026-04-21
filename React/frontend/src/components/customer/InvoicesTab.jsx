export function InvoicesTab() {
  const invoices = [
    { id: 1, amount: "$120.00", date: "2024-02-01", status: "Paid" },
    { id: 2, amount: "$89.00", date: "2024-03-01", status: "Unpaid" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Invoices</h2>

      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{inv.amount}</td>
              <td className="px-4 py-2">{inv.date}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${inv.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"}
                  `}
                >
                  {inv.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
