// src/components/customers/EditCustomerModal.jsx
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function EditCustomerModal({ customer, onClose, onSave }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip_code: "",
    notes: "",
    status: "active",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setForm({
        first_name: customer.first_name || "",
        last_name: customer.last_name || "",
        gender: customer.gender
          ? customer.gender.charAt(0).toUpperCase() +
            customer.gender.slice(1).toLowerCase()
          : "",
        date_of_birth: customer.date_of_birth
          ? customer.date_of_birth.substring(0, 10)
          : "",
        email: customer.email || "",
        phone: customer.phone || "",
        address1: customer.address1 || "",
        address2: customer.address2 || "",
        city: customer.city || "",
        state: customer.state || "",
        zip_code: customer.zip_code || "",
        notes: customer.notes || "",
        status: customer.status || "active",
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = "First name is required";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    await onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Customer</h2>

        {/* Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              name="first_name"
              value={form.first_name}
              placeholder="First Name"
              className="border rounded px-3 py-2 w-full"
              onChange={handleChange}
            />
            {errors.first_name && (
              <p className="text-xs text-red-600 mt-1">{errors.first_name}</p>
            )}
          </div>
          <div>
            <input
              name="last_name"
              value={form.last_name}
              placeholder="Last Name"
              className="border rounded px-3 py-2 w-full"
              onChange={handleChange}
            />
            {errors.last_name && (
              <p className="text-xs text-red-600 mt-1">{errors.last_name}</p>
            )}
          </div>
        </div>

        {/* Gender + DOB */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <select
            name="gender"
            value={form.gender}
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            name="date_of_birth"
            value={form.date_of_birth}
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange}
          />
        </div>

        {/* Contact */}
        <div className="mt-4">
          <input
            name="email"
            value={form.email}
            placeholder="Email"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mt-3">
          <input
            name="phone"
            value={form.phone}
            placeholder="Phone"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Address */}
        <input
          name="address1"
          value={form.address1}
          placeholder="Address Line 1"
          className="border rounded px-3 py-2 w-full mt-3"
          onChange={handleChange}
        />
        <input
          name="address2"
          value={form.address2}
          placeholder="Address Line 2"
          className="border rounded px-3 py-2 w-full mt-3"
          onChange={handleChange}
        />

        <div className="grid grid-cols-3 gap-4 mt-3">
          <input
            name="city"
            value={form.city}
            placeholder="City"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange}
          />
          <input
            name="state"
            value={form.state}
            placeholder="State"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange}
          />
          <input
            name="zip_code"
            value={form.zip_code}
            placeholder="Zip Code"
            className="border rounded px-3 py-2 w-full"
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <select
          name="status"
          value={form.status}
          className="border rounded px-3 py-2 w-full mt-4"
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="lead">Lead</option>
        </select>

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
