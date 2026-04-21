export function OverviewTab({ customer }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">

    <h2 className="text-xl font-semibold mb-4">Customer Overview</h2>

    <div className="grid grid-cols-2 gap-4">

        <div>
        <p className="text-gray-500 text-sm">Full Name</p>
        <p className="text-gray-900 font-medium">
            {customer.first_name} {customer.last_name}
        </p>
        </div>

        <div>
        <p className="text-gray-500 text-sm">Email</p>
        <p className="text-gray-900 font-medium">{customer.email}</p>
        </div>

        <div>
        <p className="text-gray-500 text-sm">Phone</p>
        <p className="text-gray-900 font-medium">{customer.phone}</p>
        </div>

        <div>
        <p className="text-gray-500 text-sm">Status</p>
        <span
            className={`px-3 py-1 rounded-full text-sm font-medium
            ${customer.status === "active" ? "bg-green-100 text-green-700" : ""}
            ${customer.status === "inactive" ? "bg-red-100 text-red-700" : ""}
            ${customer.status === "lead" ? "bg-blue-100 text-blue-700" : ""}
            `}
        >
            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
        </span>
        </div>

        <div>
        <p className="text-gray-500 text-sm">Gender</p>
        <p className="text-gray-900 font-medium">{customer.gender}</p>
        </div>

        <div>
        <p className="text-gray-500 text-sm">Date of Birth</p>
        <p className="text-gray-900 font-medium">{customer.date_of_birth}</p>
        </div>

        <div className="col-span-2">
        <p className="text-gray-500 text-sm">Address</p>
        <p className="text-gray-900 font-medium">
            {customer.address1}
            {customer.address2 ? `, ${customer.address2}` : ""}
            <br />
            {customer.city}, {customer.state} {customer.zip_code}
        </p>
        </div>

    </div>
</div>

  );
}
