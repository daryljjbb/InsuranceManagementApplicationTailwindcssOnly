import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CustomersSimple() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/customers/");
        const data = response.data.results || response.data;
        setCustomers(data);
      } catch (err) {
        console.error("Error loading customers:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  if (loading) return <h2>Loading customers...</h2>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Simple Customers (Real Data)</h1>

      {customers.length === 0 && <p>No customers found.</p>}

      <ul>
        {customers.map((cust) => (
          <li key={cust.id} style={{ marginBottom: 10 }}>
            {cust.first_name} {cust.last_name} — {cust.email}
            <button
              onClick={() => navigate(`/customer-simple-detail/${cust.id}`)}
              style={{ marginLeft: 20 }}
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
