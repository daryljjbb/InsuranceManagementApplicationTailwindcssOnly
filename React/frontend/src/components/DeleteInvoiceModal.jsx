export default function DeleteInvoiceModal({ invoice, onClose, onDelete }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">

        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Invoice</h2>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete invoice{" "}
          <strong>#{invoice.invoice_number}</strong>?
        </p>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
