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



export default function DashboardPage() {
  const [stats, setStats] = useState({
    customers: 0,
    activePolicies: 0,
    expiringPolicies: 0,
    renewals: 0,
  });

  const [renewals, setRenewals] = useState([]);
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);



  const [activity, setActivity] = useState([]);
  


useEffect(() => {
  loadActivity();
}, []);

  const loadDashboard = async () => {
    try {
      const [customersRes, policiesRes, renewalsRes] = await Promise.all([
        axios.get("http://localhost:8000/api/customers/"),
        axios.get("http://localhost:8000/api/policies/"),
        axios.get("http://localhost:8000/api/renewals/"),
      ]);

      const customers = customersRes.data;
      const policies = policiesRes.data;
      const renewalList = renewalsRes.data;

      setStats({
        customers: customers.length,
        activePolicies: policies.filter((p) => p.status === "active").length,
        expiringPolicies: policies.filter((p) => {
          const today = new Date();
          const exp = new Date(p.expiration_date);
          const diff = (exp - today) / (1000 * 60 * 60 * 24);
          return diff <= 30 && diff >= 0;
        }).length,
        renewals: renewalList.length,
      });

      setRenewals(renewalList);
    } catch (err) {
      console.error("Dashboard load failed", err);
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const activityBadge = (action) => {
  const base = "px-2 py-0.5 rounded text-xs font-semibold";

  switch (action) {
    case "customer_created":
    case "customer_updated":
    case "customer_deleted":
      return <span className={`${base} bg-blue-100 text-blue-700`}>Customer</span>;

    case "policy_created":
    case "policy_updated":
    case "policy_deleted":
      return <span className={`${base} bg-green-100 text-green-700`}>Policy</span>;

    case "invoice_created":
    case "invoice_updated":
    case "invoice_deleted":
      return <span className={`${base} bg-purple-100 text-purple-700`}>Invoice</span>;

    default:
      return <span className={`${base} bg-gray-100 text-gray-700`}>Other</span>;
  }
};


  const activityIcon = (action) => {
  switch (action) {
    // Customers
    case "customer_created":
      return <UserPlus className="text-blue-600" size={20} />;
    case "customer_updated":
      return <UserCog className="text-yellow-600" size={20} />;
    case "customer_deleted":
      return <UserX className="text-red-600" size={20} />;

    // Policies
    case "policy_created":
      return <FilePlus className="text-green-600" size={20} />;
    case "policy_updated":
      return <FilePen className="text-orange-600" size={20} />;
    case "policy_deleted":
      return <FileX className="text-red-600" size={20} />;
    // Invoices
    case "invoice_created":
      return <Receipt className="text-purple-600" size={20} />;
    case "invoice_updated":
      return <ReceiptText className="text-indigo-600" size={20} />;
    case "invoice_deleted":
      return <Trash2 className="text-red-600" size={20} />;


    default:
      return <FilePen size={20} />;
  }
};

const filteredActivity = activity.filter((log) => {
  if (filter === "all") return true;
  if (filter === "customer") return log.action.startsWith("customer_");
  if (filter === "policy") return log.action.startsWith("policy_");
  if (filter === "invoice") return log.action.startsWith("invoice_");
  return true;
});


const loadActivity = async (pageNum = 1) => {
  const res = await axios.get(`http://localhost:8000/api/activity/?page=${pageNum}`);
  
  if (pageNum === 1) {
    setActivity(res.data.results);
  } else {
    setActivity((prev) => [...prev, ...res.data.results]);
  }

  setHasMore(res.data.next !== null);
};



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

      {/* Activity List */}
      <ul className="space-y-4">
        {filteredActivity.map((log) => (
          <li key={log.id} className="border-b pb-3">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="mt-1">{activityIcon(log.action)}</div>

              {/* Message + Badge + Timestamp */}
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

function DashboardCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded shadow ${color}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

