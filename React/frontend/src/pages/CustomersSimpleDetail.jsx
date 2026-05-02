import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CustomerSimpleDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/customers/${id}/`);
        setCustomer(response.data);
      } catch (err) {
        console.error("Error loading customer:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCustomer();
  }, [id]);

  if (loading) return <h2>Loading customer...</h2>;
  if (!customer) return <h2>Customer not found</h2>;

  return (
    <div style={{ padding: 40 }}>
      <h1>
        {customer.first_name} {customer.last_name}
      </h1>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
    </div>
  );
}
