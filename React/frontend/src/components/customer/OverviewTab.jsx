export default function OverviewTab({ customer }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-8">

      {/* Section: Basic Info */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InfoBlock label="Full Name">
            {customer.first_name} {customer.last_name}
          </InfoBlock>

          <InfoBlock label="Status">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium
                ${customer.status === "active" ? "bg-green-100 text-green-700" : ""}
                ${customer.status === "inactive" ? "bg-red-100 text-red-700" : ""}
                ${customer.status === "lead" ? "bg-blue-100 text-blue-700" : ""}
              `}
            >
              {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
            </span>
          </InfoBlock>

          <InfoBlock label="Email">{customer.email}</InfoBlock>
          <InfoBlock label="Phone">{customer.phone}</InfoBlock>

          <InfoBlock label="Gender">{customer.gender || "—"}</InfoBlock>
          <InfoBlock label="Date of Birth">{customer.date_of_birth || "—"}</InfoBlock>

        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Section: Address */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InfoBlock label="Address Line 1">{customer.address1}</InfoBlock>
          <InfoBlock label="Address Line 2">{customer.address2 || "—"}</InfoBlock>

          <InfoBlock label="City">{customer.city}</InfoBlock>
          <InfoBlock label="State">{customer.state}</InfoBlock>
          <InfoBlock label="ZIP Code">{customer.zip_code}</InfoBlock>

        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Section: Metadata */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Account Metadata</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoBlock label="Customer ID">{customer.id}</InfoBlock>
          <InfoBlock label="Created At">{customer.created_at || "—"}</InfoBlock>
          <InfoBlock label="Updated At">{customer.updated_at || "—"}</InfoBlock>
        </div>
      </div>

    </div>
  );
}

/* Reusable info block component */
function InfoBlock({ label, children }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-900 font-medium">{children}</p>
    </div>
  );
}
