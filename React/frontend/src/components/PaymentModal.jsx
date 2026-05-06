// src/components/PaymentModal.jsx
import React from "react";
import Modal from "./Modal";
import CurrencyInput from "./CurrrencyInput";

export default function PaymentModal({
  open,
  mode,              // "add" | "edit" | "delete"
  paymentData,
  setPaymentData,
  onConfirm,
  onClose,
  currentBalance,
  newBalance,
  balanceColor
}) {
  const isDelete = mode === "delete";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  return (
    <Modal open={open} onClose={onClose}>
      {/* HEADER */}
      <h2 className="text-xl font-bold mb-4">
        {isAdd && "Add Payment"}
        {isEdit && "Edit Payment"}
        {isDelete && "Delete Payment"}
      </h2>

      {/* DELETE MODE */}
      {isDelete ? (
        <>
          <p className="mb-4">
            Are you sure you want to delete this payment of{" "}
            <strong>${paymentData?.amount}</strong>?
          </p>

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          {/* AMOUNT */}
          <CurrencyInput
            className="border p-2 rounded w-full mb-3"
            value={paymentData.amount}
            onChange={(val) =>
                setPaymentData({ ...paymentData, amount: val })
            }
            />



          {/* DATE */}
          <input
            type="date"
            className="border p-2 rounded w-full mb-3"
            value={paymentData.date}
            onChange={(e) =>
              setPaymentData({ ...paymentData, date: e.target.value })
            }
          />

          {/* NOTES */}
          <textarea
            className="border p-2 rounded w-full mb-3"
            placeholder="Notes (optional)"
            rows={3}
            value={paymentData.notes}
            onChange={(e) =>
              setPaymentData({ ...paymentData, notes: e.target.value })
            }
          />

          {/* Balance Preview */}
          <div className="bg-gray-50 border rounded p-3 mb-4 text-sm transition-colors duration-300">

            <p>
                <strong>Current Balance:</strong> ${currentBalance.toFixed(2)}
            </p>
            <p>
                <strong>Payment Amount:</strong> ${paymentData.amount || "0.00"}
            </p>
           <p className={balanceColor}>
            <strong>New Balance:</strong> ${newBalance.toFixed(2)}
            {newBalance < 0 && " (Overpayment!)"}
           </p>

          </div>


          {/* BUTTON */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isAdd && "Save Payment"}
            {isEdit && "Save Changes"}
          </button>
        </>
      )}
    </Modal>
  );
}
