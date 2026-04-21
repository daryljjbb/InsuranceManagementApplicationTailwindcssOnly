import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  PlusCircle,
  ClipboardList,
} from "lucide-react";

import { ArrowUp, ArrowDown, Minus } from "lucide-react";


import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export default function DashboardPage() {
  // Example data — replace with Django API later
  const premiumData = [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 15000 },
    { month: "Mar", value: 18000 },
    { month: "Apr", value: 17000 },
    { month: "May", value: 21000 },
    { month: "Jun", value: 25000 },
  ];

  const customerData = [
    { month: "Jan", customers: 12 },
    { month: "Feb", customers: 18 },
    { month: "Mar", customers: 25 },
    { month: "Apr", customers: 22 },
    { month: "May", customers: 30 },
    { month: "Jun", customers: 28 },
  ];

  const policyDistribution = [
    { name: "Auto", value: 45 },
    { name: "Home", value: 30 },
    { name: "Life", value: 15 },
    { name: "Commercial", value: 10 },
  ];

  const sparkCustomers = [
  { value: 20 }, { value: 22 }, { value: 25 }, { value: 28 }, { value: 30 }, { value: 32 }
];

const sparkPolicies = [
  { value: 300 }, { value: 310 }, { value: 320 }, { value: 330 }, { value: 342 }
];

const sparkPremium = [
  { value: 60000 }, { value: 65000 }, { value: 70000 }, { value: 76000 }, { value: 84230 }
];





  const COLORS = ["#2563eb", "#f97316", "#16a34a", "#9333ea"];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your business performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       <DashboardCard
        title="Total Customers"
        value="128"
        icon={<Users className="text-blue-600" size={28} />}
        trend="+12 this month"
        sparkData={sparkCustomers}
        />

        <DashboardCard
        title="Active Policies"
        value="342"
        icon={<FileText className="text-orange-600" size={28} />}
        trend="+5 this week"
        sparkData={sparkPolicies}
        />

        <DashboardCard
        title="Total Premium"
        value="$84,230"
        icon={<DollarSign className="text-green-600" size={28} />}
        trend="+$4,200 this month"
        sparkData={sparkPremium}
        />

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Premium Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Premium</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={premiumData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* New Customers Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">New Customers</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={customerData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="customers" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Policy Distribution Donut Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Policy Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={policyDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {policyDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <ul className="space-y-4">
            <li className="flex items-center justify-between border-b pb-3">
              <span>New customer added: <strong>Sarah Lee</strong></span>
              <span className="text-gray-500 text-sm">2 hours ago</span>
            </li>

            <li className="flex items-center justify-between border-b pb-3">
              <span>Policy renewed: <strong>A12345</strong></span>
              <span className="text-gray-500 text-sm">Yesterday</span>
            </li>

            <li className="flex items-center justify-between">
              <span>Invoice paid: <strong>$120.00</strong></span>
              <span className="text-gray-500 text-sm">3 days ago</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <PlusCircle size={20} />
              Add New Customer
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              <ClipboardList size={20} />
              Create New Policy
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
              <TrendingUp size={20} />
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable KPI Card Component */
function DashboardCard({ title, value, icon, trend, sparkData }) {
  // Determine trend direction based on last 2 sparkline points
  const last = sparkData[sparkData.length - 1].value;
  const prev = sparkData[sparkData.length - 2].value;

  const gradientId = `sparkGradient-${title.replace(/\s+/g, "")}`;
  const glowId = `glow-${title.replace(/\s+/g, "")}`;


  let color = "#6b7280"; // neutral gray

  if (last > prev) color = "#16a34a";      // green
  if (last < prev) color = "#dc2626";      // red

  let TrendIcon = <Minus className="text-gray-500" size={16} />;

if (last > prev) {
  TrendIcon = <ArrowUp className="text-green-600" size={16} />;
}

if (last < prev) {
  TrendIcon = <ArrowDown className="text-red-600" size={16} />;
}

const SparkTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-2 py-1 rounded shadow text-xs border">
        {payload[0].value}
      </div>
    );
  }
  return null;
};

  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        {icon}
      </div>

      {/* Gradient-Filled Sparkline */}
      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData}>
            <defs>
                {/* Gradient Fill */}
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color}>
                    <animate
                    attributeName="stop-opacity"
                    values="0.4;0.25;0.4"
                    dur="3s"
                    repeatCount="indefinite"
                    />
                </stop>

                <stop offset="100%" stopColor={color}>
                    <animate
                    attributeName="stop-opacity"
                    values="0;0.15;0"
                    dur="3s"
                    repeatCount="indefinite"
                    />
                </stop>
                </linearGradient>


                {/* Glow Effect */}
                <filter id={glowId} height="300%" width="300%" x="-100%" y="-100%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
                </filter>
            </defs>

            <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                dot={false}
                animationDuration={800}
                filter={`url(#${glowId})`}
            />
            <Tooltip
            content={<SparkTooltip />}
            cursor={{ stroke: color, strokeWidth: 1, strokeOpacity: 0.2 }}
            />

            </AreaChart>
        </ResponsiveContainer>
        </div>


      <div className="flex items-center gap-1">
        {TrendIcon}
        <span
            className={`text-sm font-medium ${
            last > prev
                ? "text-green-600"
                : last < prev
                ? "text-red-600"
                : "text-gray-600"
            }`}
        >
            {trend}
        </span>
        </div>

    </div>
  );
}