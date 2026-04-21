export function OverviewTab({ customer }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow">
      <div>
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Account Details</h2>
        <p><strong>Status:</strong> {customer.status}</p>
        <p><strong>Created:</strong> {customer.created_at}</p>
      </div>
    </div>
  );
}
