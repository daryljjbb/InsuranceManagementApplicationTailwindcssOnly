import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6">Menu</h2>

        <nav className="flex flex-col gap-4 text-gray-700">
          <Link className="hover:text-blue-600" to="/customers">Customers</Link>
          <Link className="hover:text-blue-600" to="/reports">Reports</Link>
          <Link className="hover:text-blue-600" to="/settings">Settings</Link>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
          <h1 className="text-lg font-semibold">My Dashboard</h1>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

