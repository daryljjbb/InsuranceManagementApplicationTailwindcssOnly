import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import Breadcrumbs from "../components/Breadcrumbs";
import { safeArray } from "../utils/apiHelpers";

export default function InvoiceDetail() {
  const { id } = useParams(); // invoice ID
  const [invoice, setInvoice] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openAddPayment, setOpenAddPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    date: "",
    notes: ""
  });

  useEffect(() => {
  const loadData = async () => {
    try {
      const inv = await axios.get(`http://localhost:8000/api/invoices/${id}/`);
      const pay = await axios.get(`http://localhost:8000/api/payments/?invoice=${id}`);

      setInvoice(inv.data);
      setPayments(safeArray(pay.data)); // ✅ always an array
    } catch (err) {
      console.error("Error loading invoice or payments:", err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [id]);

  const addPayment = async () => {
  const response = await axios.post("http://localhost:8000/api/payments/", {
    ...paymentData,
    invoice: Number(id)
  });

  // Refresh payments list
  const pay = await axios.get(`http://localhost:8000/api/payments/?invoice=${id}`);
  setPayments(pay.data);

  // Refresh invoice so balance + status update immediately
  const inv = await axios.get(`http://localhost:8000/api/invoices/${id}/`);
  setInvoice(inv.data);

  setOpenAddPayment(false);
};

const statusColors = {
  unpaid: "bg-red-600 text-white",
  partial: "bg-yellow-500 text-black",
  paid: "bg-green-600 text-white"
};

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="animate-[fadeIn_0.6s_ease-out]">
     <Breadcrumbs
          items={[
            { label: "Customers", to: "/customers" },
            { label: invoice.customer_name, to: `/customers/${invoice.customer_id}` },
            { label: `Policy ${invoice.policy_number}`, to: `/policy/${invoice.policy_id}` },
            { label: `Invoice ${invoice.invoice_number}` }
          ]}
      />



      <h1 className="text-2xl font-bold mb-4">
        Invoice #{invoice.invoice_number}
      </h1>

      <p>Total Amount: ${invoice.total_amount}</p>
      <p>Balance: ${invoice.balance}</p>
      <p className="flex items-center gap-2">
        Status:
        <span className={`px-2 py-1 rounded text-sm ${statusColors[invoice.status]}`}>
          {invoice.status}
        </span>
      </p>

      <p>Due Date: {invoice.due_date}</p>

      <hr className="my-6" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Payments</h2>
        <button
          onClick={() => setOpenAddPayment(true)}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          + Add Payment
        </button>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-center">Amount</th>
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">Notes</th>
            </tr>
          </thead>
         <tbody>
          {Array.isArray(payments) && payments.length > 0 ? (
            payments.map((p) => (
              <tr key={p.id}>
                <td className="p-3 text-center">{p.amount}</td>
                <td className="p-3 text-center">{p.date}</td>
                <td className="p-3 text-center">{p.notes}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No payments found for this invoice.
              </td>
            </tr>
          )}
        </tbody>

        </table>
      </div>

      {/* ADD PAYMENT MODAL */}
      <Modal open={openAddPayment} onClose={() => setOpenAddPayment(false)}>
        <h2 className="text-xl font-bold mb-4">Add Payment</h2>

        <input
          className="border p-2 rounded w-full mb-3"
          placeholder="Amount"
          value={paymentData.amount}
          onChange={(e) =>
            setPaymentData({ ...paymentData, amount: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 rounded w-full mb-3"
          value={paymentData.date}
          onChange={(e) =>
            setPaymentData({ ...paymentData, date: e.target.value })
          }
        />

        <textarea
          className="border p-2 rounded w-full mb-3"
          placeholder="Notes (optional)"
          rows={3}
          value={paymentData.notes}
          onChange={(e) =>
            setPaymentData({ ...paymentData, notes: e.target.value })
          }
        />

        <button
          onClick={addPayment}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </Modal>
    </div>
  );
}
