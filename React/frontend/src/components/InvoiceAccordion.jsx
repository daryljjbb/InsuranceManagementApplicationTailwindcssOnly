import { useState, useEffect } from "react";
import axios from "axios";

export default function InvoiceAccordion({ policy, customerId }) {
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const loadInvoices = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/policies/${policy.id}/invoices/`
    );
    setInvoices(res.data);
  };

  useEffect(() => {
    if (open) loadInvoices();
  }, [open]);

  return (
    <div className="border rounded-lg">
      {/* Accordion Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-t-lg"
      >
        <span className="font-semibold">
          {policy.policy_type} — #{policy.policy_number}
        </span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {/* Accordion Body */}
      {open && (
        <div className="p-4 bg-white border-t">

          {/* Add Invoice Button */}
          <button
            className="mb-3 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Invoice
          </button>

          {/* Invoice Table */}
          {invoices.length === 0 ? (
            <p className="text-gray-600">No invoices for this policy.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Invoice #</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{inv.invoice_number}</td>
                    <td className="px-4 py-3">${inv.total_amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          inv.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : inv.status === "partial"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{inv.due_date}</td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right space-x-3 flex justify-end">

                      {/* View */}
                      <button className="text-blue-600 hover:text-blue-800" title="View Invoice">
                        👁
                      </button>

                      {/* Edit */}
                      <button className="text-yellow-600 hover:text-yellow-800" title="Edit Invoice">
                        ✏️
                      </button>

                      {/* Delete */}
                      <button className="text-red-600 hover:text-red-800" title="Delete Invoice">
                        🗑
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
