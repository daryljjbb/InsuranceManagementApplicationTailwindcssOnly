import { useState, useEffect } from "react";
import { updateCustomerNotes } from "../../api/customers";

export default function NotesPanel({ customer }) {
  const [notes, setNotes] = useState(customer.notes || "");
  const [status, setStatus] = useState("saved"); // "saving" | "saved"

  // Autosave logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("saving");

      updateCustomerNotes(customer.id, notes)
        .then(() => setStatus("saved"))
        .catch(() => setStatus("error"));
    }, 600); // autosave delay

    return () => clearTimeout(timer);
  }, [notes, customer.id]);

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-4">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Notes</h2>

        <span className="text-sm text-gray-500">
          {status === "saving" && "Saving…"}
          {status === "saved" && "Saved"}
          {status === "error" && "Error saving"}
        </span>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write notes about this customer…"
        className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}
