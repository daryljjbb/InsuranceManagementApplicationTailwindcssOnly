// src/components/policies/AddPolicyModal.jsx
import { useState } from "react";
import axios from "axios";

export default function AddPolicyModal({ customerId, onClose, onPolicyAdded }) {
  const [form, setForm] = useState({
    policy_type: "",
    policy_number: "",
    effective_date: "",
    expiration_date: "",
    premium_amount: "",
  });

  const update = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const policyFields = {
    auto: [
      { name: "vehicle_make", label: "Vehicle Make" },
      { name: "vehicle_model", label: "Vehicle Model" },
      { name: "vehicle_year", label: "Vehicle Year" },
      { name: "vin", label: "VIN" },
    ],
    home: [
      { name: "property_address", label: "Property Address" },
      { name: "property_value", label: "Property Value", type: "number" },
    ],
    life: [
      { name: "beneficiary_name", label: "Beneficiary Name" },
      { name: "coverage_amount", label: "Coverage Amount", type: "number" },
    ],
  };

  const dynamicFields = policyFields[form.policy_type] || [];

  const handleSubmit = async () => {
    await axios.post("/api/policies/", {
      ...form,
      customer: customerId,
    });

    onPolicyAdded(); // ⭐ refresh parent
    onClose();       // ⭐ close modal
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg space-y-4 shadow-xl">
        <h2 className="text-xl font-semibold">Add Policy</h2>

        <select
          className="w-full border rounded-lg p-2"
          value={form.policy_type}
          onChange={e => update("policy_type", e.target.value)}
        >
          <option value="">Select Policy Type</option>
          <option value="auto">Auto Insurance</option>
          <option value="home">Home Insurance</option>
          <option value="life">Life Insurance</option>
        </select>

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Policy Number"
          value={form.policy_number}
          onChange={e => update("policy_number", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="border rounded-lg p-2"
            value={form.effective_date}
            onChange={e => update("effective_date", e.target.value)}
          />
          <input
            type="date"
            className="border rounded-lg p-2"
            value={form.expiration_date}
            onChange={e => update("expiration_date", e.target.value)}
          />
        </div>

        <input
          type="number"
          className="w-full border rounded-lg p-2"
          placeholder="Premium Amount"
          value={form.premium_amount}
          onChange={e => update("premium_amount", e.target.value)}
        />

        {dynamicFields.map(f => (
          <input
            key={f.name}
            type={f.type || "text"}
            className="w-full border rounded-lg p-2"
            placeholder={f.label}
            value={form[f.name] || ""}
            onChange={e => update(f.name, e.target.value)}
          />
        ))}

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={handleSubmit}>
            Add Policy
          </button>
        </div>
      </div>
    </div>
  );
}
