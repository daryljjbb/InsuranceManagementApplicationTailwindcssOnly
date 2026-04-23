import { useEffect, useState, useCallback } from "react";
import {
  fetchCustomers,
  createCustomer,
  deleteCustomer,
  createPolicy,   // ⭐ REQUIRED
} from "../api/customers";

export default function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [ordering, setOrdering] = useState("first_name");

  // ⭐ Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // ⭐ Normalize API response
  const normalizeList = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
  };

  // ⭐ Load all customers
  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchCustomers({
        search: debouncedSearch || "",
        ordering,
      });
      setCustomers(normalizeList(data));
    } catch (err) {
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, ordering]);

  // ⭐ Fetch whenever search or ordering changes
  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  // ⭐ Add Customer
  const addCustomer = async (payload) => {
    try {
      const newCustomer = await createCustomer(payload);
      setCustomers((prev) => [...prev, newCustomer]);
      return newCustomer;
    } catch (err) {
      console.error("Failed to create customer:", err);
      throw err;
    }
  };

  // ⭐ Add Policy (used in PolicyTab + AddPolicyModal)
  const addPolicy = async (customerId, payload) => {
    try {
      const newPolicy = await createPolicy({
        ...payload,
        customer: customerId,
      });
      return newPolicy;
    } catch (err) {
      console.error("Failed to create policy:", err);
      throw err;
    }
  };

  // ⭐ Remove Customer
  const removeCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Failed to delete customer");
    }
  };

  return {
    customers,
    loading,
    error,
    search,
    setSearch,
    ordering,
    setOrdering,
    reload: loadCustomers,
    addCustomer,
    removeCustomer,
    addPolicy,   // ⭐ IMPORTANT
  };
}
