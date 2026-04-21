import { useState } from "react";

export default function AddCustomerModal({ onClose, addCustomer, reload }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ⭐ prevents browser POST to /customers

    try {
      await addCustomer(form);  // ⭐ uses your Axios API wrapper
      await reload();           // ⭐ refresh list
      onClose();                // close modal
    } catch (err) {
      console.error("Failed to create customer:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 space-y-6 animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Customer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

  {/* First Name */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">First Name</label>
    <input
      name="first_name"
      placeholder="First Name"
      className="border rounded-lg px-3 py-2"
      value={form.first_name}
      onChange={handleChange}
      required
    />
  </div>

  {/* Last Name */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
    <input
      name="last_name"
      placeholder="Last Name"
      className="border rounded-lg px-3 py-2"
      value={form.last_name}
      onChange={handleChange}
      required
    />
  </div>

  {/* Gender */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
    <select
      name="gender"
      className="border rounded-lg px-3 py-2"
      value={form.gender}
      onChange={handleChange}
      required
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div>

  {/* Date of Birth */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
    <input
      type="date"
      name="date_of_birth"
      className="border rounded-lg px-3 py-2"
      value={form.date_of_birth}
      onChange={handleChange}
      required
    />
  </div>

  {/* Phone */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
    <input
      name="phone"
      placeholder="Phone"
      className="border rounded-lg px-3 py-2"
      value={form.phone}
      onChange={handleChange}
    />
  </div>

  {/* Email */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
    <input
      name="email"
      placeholder="Email"
      className="border rounded-lg px-3 py-2"
      value={form.email}
      onChange={handleChange}
    />
  </div>

  {/* Address 1 */}
  <div className="flex flex-col col-span-2">
    <label className="text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
    <input
      name="address1"
      placeholder="Address Line 1"
      className="border rounded-lg px-3 py-2"
      value={form.address1}
      onChange={handleChange}
    />
  </div>

  {/* Address 2 */}
  <div className="flex flex-col col-span-2">
    <label className="text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
    <input
      name="address2"
      placeholder="Address Line 2"
      className="border rounded-lg px-3 py-2"
      value={form.address2}
      onChange={handleChange}
    />
  </div>

  {/* City */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">City</label>
    <input
      name="city"
      placeholder="City"
      className="border rounded-lg px-3 py-2"
      value={form.city}
      onChange={handleChange}
    />
  </div>

  {/* State */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">State</label>
    <input
      name="state"
      placeholder="State"
      className="border rounded-lg px-3 py-2"
      value={form.state}
      onChange={handleChange}
    />
  </div>

  {/* Zip Code */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">Zip Code</label>
    <input
      name="zip_code"
      placeholder="Zip Code"
      className="border rounded-lg px-3 py-2"
      value={form.zip_code}
      onChange={handleChange}
    />
  </div>
  {/* Status */}
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
            name="status"
            className="border rounded-lg px-3 py-2"
            value={form.status}
            onChange={handleChange}
        >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="lead">Lead</option>
        </select>
    </div>

  {/* Submit */}
  <button
    type="submit"
    className="col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
  >
    Save Customer
  </button>
</form>

      </div>
    </div>
  );
}
