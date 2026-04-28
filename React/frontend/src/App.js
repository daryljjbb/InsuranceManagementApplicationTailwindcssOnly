import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import Customers from "./pages/Customers";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import Reports from "./pages/Reports";
import ActivityHistoryPage from "./pages/ActivityHistoryPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetailPage />} />
          <Route path="reports" element={<Reports />} />
          <Route path="/activity" element={<ActivityHistoryPage />} />

        </Route>
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
