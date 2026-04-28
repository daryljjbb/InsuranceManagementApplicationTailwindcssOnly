import { useState } from "react";
import axios from "axios";

export default function AddInvoiceModal({ policyId, onClose, onCreated }) {
  const [form, setForm] = useState({
    invoice_number: "",
    total_amount: "",
    balance: "",
    due_date: "",
    status: "unpaid",
    notes: "",
  });

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    await axios.post("http://localhost:8000/api/invoices/", {
      policy: policyId,
      invoice_number: form.invoice_number,
      total_amount: form.total_amount,
      balance: form.balance,
      due_date: form.due_date,
      status: form.status,
      notes: form.notes,
    });

    onCreated();
    onClose();
  } catch (err) {
    console.error("Invoice POST failed:", err.response?.data || err);
  }
};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">

        <h2 className="text-xl font-bold mb-4">Add Invoice</h2>

        <input
          name="invoice_number"
          value={form.invoice_number}
          placeholder="Invoice Number"
          className="border rounded px-3 py-2 w-full"
          onChange={update}
        />

        <input
          name="total_amount"
          value={form.total_amount}
          placeholder="Total Amount"
          className="border rounded px-3 py-2 w-full mt-3"
          onChange={update}
        />

        <input
          name="balance"
          value={form.balance}
          placeholder="Balance"
          className="border rounded px-3 py-2 w-full mt-3"
          onChange={update}
        />

        <input
          type="date"
          name="due_date"
          value={form.due_date}
          className="border rounded px-3 py-2 w-full mt-3"
          onChange={update}
        />

        <select
          name="status"
          value={form.status}
          className="border rounded px-3 py-2 w-full mt-3"
          onChange={update}
        >
          <option value="unpaid">Unpaid</option>
          <option value="partial">Partially Paid</option>
          <option value="paid">Paid</option>
        </select>

        <textarea
          name="notes"
          value={form.notes}
          placeholder="Notes"
          className="border rounded px-3 py-2 w-full mt-3"
          rows={3}
          onChange={update}
        />

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Invoice
          </button>
        </div>

      </div>
    </div>
  );
}
