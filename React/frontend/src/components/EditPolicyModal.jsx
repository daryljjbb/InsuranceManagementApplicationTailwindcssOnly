import { useState, useEffect } from "react";

export default function EditPolicyModal({ policy, onClose, onSave }) {
  const [form, setForm] = useState({
    policy_type: "",
    policy_number: "",
    premium_amount: "",
    effective_date: "",
    expiration_date: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_year: "",
    home_address: "",
    home_value: "",
    life_coverage_amount: "",
    notes: "",
  });

  // Pre-fill form when modal opens
  useEffect(() => {
    if (policy) {
      setForm({
        policy_type: policy.policy_type || "",
        policy_number: policy.policy_number || "",
        premium_amount: policy.premium_amount || "",
        effective_date: policy.effective_date || "",
        expiration_date: policy.expiration_date || "",
        vehicle_make: policy.vehicle_make || "",
        vehicle_model: policy.vehicle_model || "",
        vehicle_year: policy.vehicle_year || "",
        home_address: policy.home_address || "",
        home_value: policy.home_value || "",
        life_coverage_amount: policy.life_coverage_amount || "",
        notes: policy.notes || "",
      });
    }
  }, [policy]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await onSave(form);
    onClose();
  };

  // Dynamic fields based on policy type
  const renderDynamicFields = () => {
    switch (form.policy_type) {
      case "Auto":
        return (
          <div className="grid grid-cols-3 gap-4 mt-4">
            <input
              name="vehicle_make"
              value={form.vehicle_make}
              placeholder="Vehicle Make"
              className="border rounded px-3 py-2 w-full"
              onChange={handleChange}
            />
            <input
              name="vehicle_model"
              value={form.vehicle_model}
              placeholder="Vehicle Model"
              className="border rounded px-3 py-2 w-full"
              onChange={handleChange}
            />
            <input
              name="vehicle_year"
              value={form.vehicle_year}
              placeholder="Year"
              className="border rounded px-3 py-2 w-full"
              onChange={handleChange}
            />
          </div>
        );

      case "Home":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              name="home_address"
              value={form.home_address}
              placeholder="Home Address"
              className="border rounded px-3 py-2 w-full"
              onChange={handleChange}
            />
            <input
              name="home_value"
              value={form.home_value}
              placeholder="Home Value"
              className="border rounded px-3 py-2 w-full"
              onChange={handleChange}
            />
          </div>
        );

      case "Life":
        return (
          <input
            name="life_coverage_amount"
            value={form.life_coverage_amount}
            placeholder="Coverage Amount"
            className="border rounded px-3 py-2 w-full mt-4"
            onChange={handleChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">

        <h2 className="text-xl font-bold mb-4">Edit Policy</h2>

        {/* Policy Type */}
        <select
          name="policy_type"
          value={form.policy_type}
          className="border rounded px-3 py-2 w-full"
          onChange={handleChange}
        >
          <option value="">Select Policy Type</option>
          <option value="Auto">Auto</option>
          <option value="Home">Home</option>
          <option value="Life">Life</option>
        </select>

        {/* Policy Number */}
        <input
          name="policy_number"
          value={form.policy_number}
          placeholder="Policy Number"
          className="border rounded px-3 py-2 w-full mt-4"
          onChange={handleChange}
        />

        {/* Premium */}
        <input
          name="premium_amount"
          value={form.premium_amount}
          placeholder="Premium Amount"
          className="border rounded px-3 py-2 w-full mt-4"
          onChange={handleChange}
        />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mt-4">
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

        {/* Dynamic Fields */}
        {renderDynamicFields()}

        {/* Notes */}
        <textarea
          name="notes"
          value={form.notes}
          placeholder="Notes"
          className="border rounded px-3 py-2 w-full mt-4"
          rows={3}
          onChange={handleChange}
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
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
