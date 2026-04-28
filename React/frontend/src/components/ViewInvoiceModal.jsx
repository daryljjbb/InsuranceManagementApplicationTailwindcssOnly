export default function ViewInvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">

        <h2 className="text-xl font-bold mb-4">Invoice #{invoice.invoice_number}</h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>Total Amount:</strong> ${invoice.total_amount}</p>
          <p><strong>Balance:</strong> ${invoice.balance}</p>
          <p><strong>Status:</strong> {invoice.status}</p>
          <p><strong>Due Date:</strong> {invoice.due_date}</p>
          <p><strong>Notes:</strong> {invoice.notes || "No notes"}</p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
