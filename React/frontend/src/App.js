import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import PolicyDetail from "./pages/PolicyDetail";
import InvoiceDetail from "./pages/InvoiceDetail";

function App() {
  return (
    <Router>
      <Routes>

        {/* LAYOUT WRAPS YOUR REAL PAGES */}
        <Route path="/" element={<Layout />}>
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="policy/:id" element={<PolicyDetail />} />
          <Route path="/invoice/:id" element={<InvoiceDetail />} />


        </Route>

      </Routes>
    </Router>
  );
}

export default App;


