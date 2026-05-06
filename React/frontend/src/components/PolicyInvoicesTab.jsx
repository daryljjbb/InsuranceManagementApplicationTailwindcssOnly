import { useNavigate } from "react-router-dom";

export default function PolicyInvoicesTab({
  policyId,
  invoices,
  setInvoices,
  openAddInvoice
}) {
  const navigate = useNavigate();

  const statusColors = {
    unpaid: "bg-red-600 text-white",
    partial: "bg-yellow-500 text-black",
    paid: "bg-green-600 text-white"
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Invoices</h2>

        <button
          onClick={openAddInvoice}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          + Add Invoice
        </button>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-center">Invoice #</th>
              <th className="p-3 text-center">Amount</th>
              <th className="p-3 text-center">Balance</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Due Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length > 0 ? (
              invoices.map((inv, index) => (
                <tr
                  key={inv.id}
                  className="border-b hover:bg-gray-50 opacity-0 animate-[fadeIn_0.35s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <td className="p-3 text-center">{inv.invoice_number}</td>
                  <td className="p-3 text-center">${inv.total_amount}</td>
                  <td className="p-3 text-center">${inv.balance}</td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-sm ${statusColors[inv.status]}`}
                    >
                      {inv.status}
                    </span>
                  </td>

                  <td className="p-3 text-center">{inv.due_date}</td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`/invoice/${inv.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No invoices found for this policy.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
