import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function EditPolicyModal({ policy, onClose, onSave }) {
  const [form, setForm] = useState({
    policy_type: "",
    policy_number: "",
    effective_date: "",
    expiration_date: "",
    premium_amount: "",
    carrier: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (policy) {
      setForm({
        policy_type: policy.policy_type || "",
        policy_number: policy.policy_number || "",
        effective_date: policy.effective_date || "",
        expiration_date: policy.expiration_date || "",
        premium_amount: policy.premium_amount || "",
        carrier: policy.carrier || "",
        status: policy.status || "active",
      });
    }
  }, [policy]);

  const validate = () => {
    const e = {};
    if (!form.policy_type) e.policy_type = "Policy type is required";
    if (!form.policy_number) e.policy_number = "Policy number is required";
    if (!form.effective_date) e.effective_date = "Effective date required";
    if (!form.expiration_date) e.expiration_date = "Expiration date required";
    if (!form.premium_amount) e.premium_amount = "Premium amount required";
    return e;
  };

  const handleSubmit = async () => {
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }

    await onSave(form);
    toast.success("Policy updated");
    onClose();
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Edit Policy</h2>

        {/* Policy Type */}
        <select
          name="policy_type"
          value={form.policy_type}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="auto">Auto</option>
          <option value="home">Home</option>
          <option value="life">Life</option>
        </select>

        {/* Policy Number */}
        <input
          name="policy_number"
          value={form.policy_number}
          placeholder="Policy Number"
          className="border rounded px-3 py-2 w-full mt-3"
          onChange={handleChange}
        />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <input
            type="date"
            name="effective_date"
            value={form.effective_date}
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange}
          />
          <input
            type="date"
            name="expiration_date"
            value={form.expiration_date}
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange}
          />
        </div>

        {/* Premium */}
        <input
          name="premium_amount"
          value={form.premium_amount}
          placeholder="Premium Amount"
          className="border rounded px-3 py-2 w-full mt-3"
          onChange={handleChange}
        />

        {/* Carrier */}
        <input
          name="carrier"
          value={form.carrier}
          placeholder="Carrier"
          className="border rounded px-3 py-2 w-full mt-3"
          onChange={handleChange}
        />

        {/* Status */}
        <select
          name="status"
          value={form.status}
          className="border rounded px-3 py-2 w-full mt-4"
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Buttons */}
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
