import { useState } from "react";
import AddPolicyModal from "../policies/AddPolicyModal";

export default function PolicyTab({ customer, addPolicy }) {
  const [showAddModal, setShowAddModal] = useState(false);

  const openModal = () => setShowAddModal(true);
  const closeModal = () => setShowAddModal(false);

  const hasPolicies = customer?.policies && customer.policies.length > 0;

  return (
    <div className="space-y-6">

      {/* ⭐ Add Policy Button (always visible) */}
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Policy
        </button>
      </div>

      {/* ⭐ Empty State */}
      {!hasPolicies && (
        <div className="text-center py-10 space-y-3">
          <p className="text-gray-500">No policies found for this customer.</p>

          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add First Policy
          </button>
        </div>
      )}

      {/* ⭐ Policy List */}
      {hasPolicies && (
        <div className="space-y-4">
          {customer.policies.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow rounded-xl p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{p.policy_number}</h3>

                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${p.policy_type === "auto" && "bg-blue-100 text-blue-700"}
                    ${p.policy_type === "home" && "bg-green-100 text-green-700"}
                    ${p.policy_type === "life" && "bg-purple-100 text-purple-700"}
                  `}
                >
                  {p.policy_type.charAt(0).toUpperCase() + p.policy_type.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-gray-500 text-sm">Effective Date</p>
                  <p className="font-medium">{p.effective_date}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Expiration Date</p>
                  <p className="font-medium">{p.expiration_date}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Premium</p>
                  <p className="font-medium">${p.premium_amount}</p>
                </div>

                {p.coverage_amount && (
                  <div>
                    <p className="text-gray-500 text-sm">Coverage Amount</p>
                    <p className="font-medium">${p.coverage_amount}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ⭐ Add Policy Modal */}
      {showAddModal && (
        <AddPolicyModal
          customerId={customer.id}
          addPolicy={addPolicy}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
