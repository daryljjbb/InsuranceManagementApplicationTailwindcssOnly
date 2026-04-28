import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function RenewalReminderList() {
  const [reminders, setReminders] = useState([]);

  const loadReminders = async () => {
    const res = await axios.get("http://localhost:8000/api/renewals/");
    setReminders(res.data);
  };

  const acknowledge = async (id) => {
    await axios.post(`http://localhost:8000/api/renewals/${id}/ack/`);
    toast.success("Reminder dismissed");
    loadReminders();
  };

  useEffect(() => {
    loadReminders();
  }, []);

  if (reminders.length === 0)
    return <p className="text-gray-600">No renewal reminders.</p>;

  return (
    <div className="space-y-3">
      {reminders.map((r) => (
        <div
          key={r.id}
          className="p-4 border rounded bg-yellow-50 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              Policy #{r.policy_number} expires on {r.expiration_date}
            </p>
            <p className="text-sm text-gray-600">{r.customer_name}</p>
          </div>

          <button
            onClick={() => acknowledge(r.id)}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}

