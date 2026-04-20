import { useState } from "react";
import {
  Home,
  BarChart2,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Outlet , NavLink} from "react-router-dom"; // for nested routing


export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop mini-sidebar
  const [profileOpen, setProfileOpen] = useState(false);

 const menuItems = [
  { name: "Dashboard", icon: <Home size={20} />, path: "/" },
  { name: "Reports", icon: <BarChart2 size={20} />, path: "/reports" },
  { name: "Customers", icon: <Users size={20} />, path: "/customers" },
  { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
];


  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          w-64 bg-white shadow-md z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <span className="font-bold text-xl">Menu</span>}

          {/* Collapse Button (desktop only) */}
          <button
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded hover:bg-gray-200"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group">
             <NavLink
                to={item.path}
                className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded hover:bg-gray-200 transition-all
                    ${collapsed ? "justify-center" : "space-x-3"}
                    ${isActive ? "bg-gray-200 font-semibold" : ""}`
                }
                >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
            </NavLink>


              {/* Floating Tooltip */}
              {collapsed && (
                <span className="absolute left-20 top-1/2 -translate-y-1/2 
                  bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 
                  group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAVBAR */}
        <header className="bg-white shadow flex items-center justify-between px-6 h-16">
          {/* Hamburger (mobile/tablet/small desktop) */}
          <button
            className="lg:hidden text-gray-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="text-xl font-semibold">My Dashboard</div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span>Profile</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Profile</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Settings</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Sign Out</a>
              </div>
            )}
          </div>
        </header>
             {/* Main content */}
        <main className="flex-1 p-6">
            <Outlet />   {/* This renders DashboardPage */}
        </main>
      </div>
    </div>
  );
}
