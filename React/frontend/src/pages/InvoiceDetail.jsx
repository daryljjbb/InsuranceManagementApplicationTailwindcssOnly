// src/pages/InvoiceDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../components/Breadcrumbs";
import PaymentModal from "../components/PaymentModal";
import { safeArray } from "../utils/apiHelpers";
import { Pencil, Trash2 } from "lucide-react";


export default function InvoiceDetail() {
  const { id } = useParams(); // invoice ID
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  // Unified Payment Modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState("add"); // "add" | "edit" | "delete"
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    date: "",
    notes: ""
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const inv = await axios.get(`http://localhost:8000/api/invoices/${id}/`);
        const pay = await axios.get(
          `http://localhost:8000/api/payments/?invoice=${id}`
        );

        setInvoice(inv.data);
        setPayments(safeArray(pay.data));
      } catch (err) {
        console.error("Error loading invoice or payments:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const statusColors = {
    unpaid: "bg-red-600 text-white",
    partial: "bg-yellow-500 text-black",
    paid: "bg-green-600 text-white"
  };

  const handleBack = () => {
    setIsLeaving(true);
    setTimeout(() => navigate(-1), 250);
  };

  // ---------- Modal open helpers ----------

  const openAddPayment = () => {
    setPaymentMode("add");
    setSelectedPayment(null);
    setPaymentData({ amount: "", date: "", notes: "" });
    setPaymentModalOpen(true);
  };

  const openEditPayment = (p) => {
  setPaymentMode("edit");
  setSelectedPayment(p);
  setPaymentData({
    amount: p.amount,
    date: p.payment_date,
    notes: p.notes,
    original_amount: p.amount   // ⭐ ADD THIS
  });
  setPaymentModalOpen(true);
};


  const openDeletePayment = (p) => {
    setPaymentMode("delete");
    setSelectedPayment(p);
    setPaymentData({
      amount: p.amount,
      date: p.payment_date,
      notes: p.notes
    });
    setPaymentModalOpen(true);
  };

  // ---------- Confirm handler for Add/Edit/Delete ----------

  const handlePaymentConfirm = async () => {
    try {
      if (paymentMode === "add") {
        if (Number(paymentData.amount) > Number(invoice.balance)) {
          alert("Payment cannot exceed remaining balance.");
          return;
        }

        await axios.post("http://localhost:8000/api/payments/", {
          ...paymentData,
          invoice: Number(id)
        });
      }

      if (paymentMode === "edit" && selectedPayment) {
        await axios.put(
          `http://localhost:8000/api/payments/${selectedPayment.id}/`,
          {
            ...paymentData,
            invoice: Number(id)
          }
        );
      }

      if (paymentMode === "delete" && selectedPayment) {
        await axios.delete(
          `http://localhost:8000/api/payments/${selectedPayment.id}/`
        );
      }

      // Refresh payments + invoice after any change
      const pay = await axios.get(
        `http://localhost:8000/api/payments/?invoice=${id}`
      );
      setPayments(safeArray(pay.data));

      const inv = await axios.get(`http://localhost:8000/api/invoices/${id}/`);
      setInvoice(inv.data);

      setPaymentModalOpen(false);
    } catch (err) {
      console.error("Error updating payments:", err);
    }
  };

  if (loading || !invoice) return <h2>Loading...</h2>;

  // Live balance preview
const currentBalance = Number(invoice?.balance || 0);
const enteredAmount = Number(paymentData.amount || 0);
let newBalance;

if (paymentMode === "edit") {
  const original = Number(paymentData.original_amount || 0);
  const edited = Number(paymentData.amount || 0);
  newBalance = currentBalance + original - edited;
} else {
  newBalance = currentBalance - enteredAmount;
}



// Dynamic color transition for new balance
let balanceColor = "text-green-600";

if (newBalance < 0) {
  balanceColor = "text-red-600 font-semibold";
} else if (newBalance <= currentBalance * 0.25) {
  balanceColor = "text-yellow-600 font-semibold";
}



  return (
    <div className={isLeaving ? "animate-fadeOut" : "animate-fadeIn"}>
      <button
        onClick={handleBack}
        className="mb-3 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <Breadcrumbs
        items={[
          { label: "Customers", to: "/customers" },
          {
            label: invoice.customer_name,
            to: `/customers/${invoice.customer_id}`
          },
          {
            label: `Policy ${invoice.policy_number}`,
            to: `/policy/${invoice.policy_id}`
          },
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
        <span
          className={`px-2 py-1 rounded text-sm ${statusColors[invoice.status]}`}
        >
          {invoice.status}
        </span>
      </p>

      <p>Due Date: {invoice.due_date}</p>

      <hr className="my-6" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Payments</h2>
        <button
          onClick={openAddPayment}
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
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(payments) && payments.length > 0 ? (
              payments.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 text-center">${p.amount}</td>
                  <td className="p-3 text-center">{p.date}</td>
                  <td className="p-3 text-center">{p.notes}</td>
                  <td className="p-3 text-center flex justify-center gap-2">
                   <div className="flex justify-center gap-3">
                      <button
                        onClick={() => openEditPayment(p)}
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        title="Edit Payment"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => openDeletePayment(p)}
                        className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        title="Delete Payment"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No payments found for this invoice.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     <PaymentModal
      open={paymentModalOpen}
      mode={paymentMode}
      paymentData={paymentData}
      setPaymentData={setPaymentData}
      onConfirm={handlePaymentConfirm}
      onClose={() => setPaymentModalOpen(false)}
      currentBalance={currentBalance}
      newBalance={newBalance}
      balanceColor={balanceColor}
    />


    </div>
  );
}
