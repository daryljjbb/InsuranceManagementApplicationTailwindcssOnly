import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import { Toaster } from "react-hot-toast";

function App() {



  return (
   <Router>
      <Routes>
        {/* Wrap all protected routes in the Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} /> {/* Default page */}
          <Route path="reports" element={<Reports />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetailPage />} />

        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}

export default App;

