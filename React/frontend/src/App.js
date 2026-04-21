import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import api from "./api/axios";

function App() {

  useEffect(() => {
    api.get("csrf/");   // ⭐ This sets the csrftoken cookie
  }, []);
  return (
    <Router>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="reports" element={<Reports />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetailPage />} />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}

export default App;

