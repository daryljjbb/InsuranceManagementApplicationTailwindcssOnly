import { useState } from "react";

export default function AddPolicyModal({ customerId, onClose, onSave }) {
  const [form, setForm] = useState({
    policy_type: "",
    policy_number: "",
    effective_date: "",
    expiration_date: "",
    premium_amount: "",
    carrier: "",
    coverage_amount: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_year: "",
    vin: "",
    property_address: "",
    property_value: "",
    beneficiary_name: "",
    notes: "",
  });

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await onSave(form);
    onClose();
  };

  // Dynamic fields based on policy type
  const renderDynamicFields = () => {
    switch (form.policy_type) {
      case "auto":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              name="vehicle_make"
              value={form.vehicle_make}
              placeholder="Vehicle Make"
              className="border rounded px-3 py-2 w-full"
              onChange={update}
            />
            <input
              name="vehicle_model"
              value={form.vehicle_model}
              placeholder="Vehicle Model"
              className="border rounded px-3 py-2 w-full"
              onChange={update}
            />
            <input
              name="vehicle_year"
              value={form.vehicle_year}
              placeholder="Vehicle Year"
              className="border rounded px-3 py-2 w-full"
              onChange={update}
            />
            <input
              name="vin"
              value={form.vin}
              placeholder="VIN"
              className="border rounded px-3 py-2 w-full"
              onChange={update}
            />
          </div>
        );

      case "home":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              name="property_address"
              value={form.property_address}
              placeholder="Property Address"
              className="border rounded px-3 py-2 w-full"
              onChange={update}
            />
            <input
              name="property_value"
              value={form.property_value}
              placeholder="Property Value"
              className="border rounded px-3 py-2 w-full"
              onChange={update}
            />
          </div>
        );

      case "life":
        return (
          <div className="mt-4">
            <input
              name="beneficiary_name"
              value={form.beneficiary_name}
              placeholder="Beneficiary Name"
              className="border rounded px-3 py-2 w-full"
              onChange={update}
            />
            <input
              name="coverage_amount"
              value={form.coverage_amount}
              placeholder="Coverage Amount"
              className="border rounded px-3 py-2 w-full mt-3"
              onChange={update}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">

        <h2 className="text-xl font-bold mb-4">Add Policy</h2>

        {/* Policy Type */}
        <select
          name="policy_type"
          value={form.policy_type}
          className="border rounded px-3 py-2 w-full"
          onChange={update}
        >
          <option value="">Select Policy Type</option>
          <option value="auto">Auto Insurance</option>
          <option value="home">Home Insurance</option>
          <option value="life">Life Insurance</option>
        </select>

        {/* Policy Number */}
        <input
          name="policy_number"
          value={form.policy_number}
          placeholder="Policy Number"
          className="border rounded px-3 py-2 w-full mt-4"
          onChange={update}
        />

        {/* Carrier */}
        <input
          name="carrier"
          value={form.carrier}
          placeholder="Carrier"
          className="border rounded px-3 py-2 w-full mt-4"
          onChange={update}
        />

        {/* Premium */}
        <input
          name="premium_amount"
          value={form.premium_amount}
          placeholder="Premium Amount"
          className="border rounded px-3 py-2 w-full mt-4"
          onChange={update}
        />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="date"
            name="effective_date"
            value={form.effective_date}
            className="border rounded px-3 py-2 w-full"
            onChange={update}
          />
          <input
            type="date"
            name="expiration_date"
            value={form.expiration_date}
            className="border rounded px-3 py-2 w-full"
            onChange={update}
          />
        </div>

        {/* Dynamic Fields */}
        {renderDynamicFields()}

        {/* Notes */}
        <textarea
          name="notes"
          value={form.notes}
          placeholder="Notes"
          className="border rounded px-3 py-2 w-full mt-4"
          rows={3}
          onChange={update}
        />

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
            Add Policy
          </button>
        </div>

      </div>
    </div>
  );
}
