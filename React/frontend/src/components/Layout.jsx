// src/components/Layout.jsx
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6">Menu</h2>

        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-gray-200 font-semibold" : ""
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-gray-200 font-semibold" : ""
              }`
            }
          >
            Reports
          </NavLink>

          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-gray-200 font-semibold" : ""
              }`
            }
          >
            Customers
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-200 ${
                isActive ? "bg-gray-200 font-semibold" : ""
              }`
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="bg-white shadow px-6 h-16 flex items-center">
          <h1 className="text-xl font-semibold">My Dashboard</h1>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
