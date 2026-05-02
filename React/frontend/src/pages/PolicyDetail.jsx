import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import Breadcrumbs from "../components/Breadcrumbs";
import { safeArray } from "../utils/apiHelpers";


export default function PolicyDetail() {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [openAddInvoice, setOpenAddInvoice] = useState(false);
 const [invoiceData, setInvoiceData] = useState({
  invoice_number: "",
  total_amount: "",
  balance: "",
  status: "unpaid",
  due_date: "",
  notes: ""
});


 useEffect(() => {
  const loadData = async () => {
    try {
      const pol = await axios.get(`http://localhost:8000/api/policies/${id}/`);
      const inv = await axios.get(`http://localhost:8000/api/invoices/?policy=${id}`);

      setPolicy(pol.data);
      setInvoices(safeArray(inv.data)); // ✅ always an array
    } catch (err) {
      console.error("Error loading policy or invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [id]);


 const addInvoice = async () => {
  const response = await axios.post("http://localhost:8000/api/invoices/", {
    ...invoiceData,
    policy: Number(id)
  });

  setInvoices([...invoices, response.data]);
  setOpenAddInvoice(false);
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
            { label: policy.customer_name, to: `/customer/${policy.customer}` },
            { label: `Policy ${policy.policy_number}` }
          ]}
      />

      <h1 className="text-2xl font-bold mb-4">Policy #{policy.policy_number}</h1>

      <p>Type: {policy.policy_type}</p>
      <p>Premium: ${policy.premium_amount}</p>

      <hr className="my-6" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Invoices</h2>
        <button
          onClick={() => setOpenAddInvoice(true)}
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
            {Array.isArray(invoices) && invoices.length > 0 ? (
              invoices.map((inv) => (
                <tr key={inv.id} className="border-b">
                  <td className="p-3 text-center">{inv.invoice_number}</td>
                  <td className="p-3 text-center">${inv.total_amount}</td>
                  <td className="p-3 text-center">${inv.balance}</td>
                  <td className="p-3 text-center">
                    <span className="flex items-center text-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full text-center inline-block ${statusColors[inv.status]}`}
                      ></span>
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

      {/* ADD INVOICE MODAL */}
      <Modal open={openAddInvoice} onClose={() => setOpenAddInvoice(false)}>
        <h2 className="text-xl font-bold mb-4">Add Invoice</h2>

        <input
          className="border p-2 rounded w-full mb-3"
          placeholder="Invoice Number"
          value={invoiceData.invoice_number}
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, invoice_number: e.target.value })
          }
        />

        <input
          className="border p-2 rounded w-full mb-3"
          placeholder="Total Amount"
          value={invoiceData.total_amount}
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, total_amount: e.target.value })
          }
        />

        <input
          className="border p-2 rounded w-full mb-3"
          placeholder="Balance"
          value={invoiceData.balance}
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, balance: e.target.value })
          }
        />

        <select
          className="border p-2 rounded w-full mb-3"
          value={invoiceData.status}
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, status: e.target.value })
          }
        >
          <option value="unpaid">Unpaid</option>
          <option value="partial">Partially Paid</option>
          <option value="paid">Paid</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded w-full mb-3"
          value={invoiceData.due_date}
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, due_date: e.target.value })
          }
        />

        <textarea
          className="border p-2 rounded w-full mb-3"
          placeholder="Notes (optional)"
          rows={3}
          value={invoiceData.notes}
          onChange={(e) =>
            setInvoiceData({ ...invoiceData, notes: e.target.value })
          }
        />

        <button
          onClick={addInvoice}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </Modal>

    </div>
  );
}
