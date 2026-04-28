// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  UserPlus,
  UserCog,
  UserX,
  FilePlus,
  FilePen,
  FileX,
  Receipt,
  ReceiptText,
  Trash2,
} from "lucide-react";
import { activityIcon, activityBadge, groupActivityByDate } from "../components/activityHelpers";



export default function DashboardPage() {
  const [stats, setStats] = useState({
    customers: 0,
    activePolicies: 0,
    expiringPolicies: 0,
    renewals: 0,
  });
  const [activity, setActivity] = useState([]);
  const [renewals, setRenewals] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("all");

  // -----------------------------
  // Load Dashboard Stats
  // -----------------------------
  const loadStats = async () => {
    const res = await axios.get("http://localhost:8000/api/dashboard-summary/");
    setStats(res.data);
  };

  // -----------------------------
  // Load Activity (with Pagination)
  // -----------------------------
  const loadActivity = async (pageNum = 1) => {
    const res = await axios.get(
      `http://localhost:8000/api/activity/?page=${pageNum}`
    );

    if (pageNum === 1) {
      setActivity(res.data.results);
    } else {
      setActivity((prev) => [...prev, ...res.data.results]);
    }

    setHasMore(res.data.next !== null);
  };

  // -----------------------------
  // Load Renewals
  // -----------------------------
  const loadRenewals = async () => {
    const res = await axios.get("http://localhost:8000/api/renewals/");
    setRenewals(res.data);
  };

  // -----------------------------
  // Initial Load
  // -----------------------------
  useEffect(() => {
    loadStats();
    loadActivity();
    loadRenewals();
  }, []);

  // -----------------------------
  // Filter + Group Activity
  // -----------------------------
  const filteredActivity = activity.filter((log) => {
    if (filter === "all") return true;
    if (filter === "customer") return log.action.startsWith("customer_");
    if (filter === "policy") return log.action.startsWith("policy_");
    if (filter === "invoice") return log.action.startsWith("invoice_");
    return true;
  });

  const grouped = groupActivityByDate(filteredActivity);

  // -----------------------------
  // Render Group Helper
  // -----------------------------
  const renderGroup = (title, items) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <ul className="space-y-4">
          {items.map((log) => (
            <li key={log.id} className="border-b pb-3">
              <div className="flex items-start gap-3">
                <div className="mt-1">{activityIcon(log.action)}</div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {activityBadge(log.action)}
                    <p className="font-medium">{log.message}</p>
                  </div>

                  <p className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // -----------------------------
  // Return JSX
  // -----------------------------
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Customers"
          value={stats.customers}
          color="bg-blue-100 text-blue-700"
        />
        <DashboardCard
          title="Active Policies"
          value={stats.activePolicies}
          color="bg-green-100 text-green-700"
        />
        <DashboardCard
          title="Expiring Soon"
          value={stats.expiringPolicies}
          color="bg-yellow-100 text-yellow-700"
        />
        <DashboardCard
          title="Renewal Reminders"
          value={stats.renewals}
          color="bg-red-100 text-red-700"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-4">
          {["all", "customer", "policy", "invoice"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded border ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* No Activity Message */}
        {filteredActivity.length === 0 && (
          <p className="text-gray-600">
            No {filter === "all" ? "" : filter} activity found.
          </p>
        )}

        {/* Activity List with Date Grouping */}
        <div>
          {renderGroup("Today", grouped.today)}
          {renderGroup("Yesterday", grouped.yesterday)}
          {renderGroup("This Week", grouped.thisWeek)}
          {renderGroup("Older", grouped.older)}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                loadActivity(nextPage);
              }}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Upcoming Renewals */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Upcoming Renewals</h3>

        {renewals.length === 0 ? (
          <p className="text-gray-600">No upcoming renewals.</p>
        ) : (
          <div className="space-y-3">
            {renewals.map((r) => (
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------------------
// Dashboard Card Component
// -----------------------------

function DashboardCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded shadow ${color}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

