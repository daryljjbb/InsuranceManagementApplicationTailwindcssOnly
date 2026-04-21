import { useEffect, useState } from "react";
import { fetchCustomerById } from "../api/customers";

export default function useCustomer(id) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetchCustomerById(id)
      .then((data) => {
        setCustomer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load customer:", err);
        setLoading(false);
      });
  }, [id]);

  return { customer, loading };
}
