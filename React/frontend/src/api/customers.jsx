// api/customers.js
import api from "./axios";

/**
 * Fetch all customers with optional search + ordering
 */
export const fetchCustomers = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await api.get(`/customers/?${query}`);
  return res.data;
};

/**
 * Fetch a single customer by ID
 */
export const fetchCustomerById = async (id) => {
  const res = await api.get(`/customers/${id}/`);
  return res.data;
};

/**
 * Create a new customer
 */
export const createCustomer = async (payload) => {
  const res = await api.post(`/customers/`, payload);
  return res.data;
};

/**
 * Delete a customer by ID
 */
export const deleteCustomer = async (id) => {
  await api.delete(`/customers/${id}/`);
};

/**
 * Update customer notes
 */
export const updateCustomerNotes = async (id, notes) => {
  const res = await api.patch(`/customers/${id}/notes/`, { notes });
  return res.data;
};

/**
 * ⭐ Create a policy for a customer
 */
export const createPolicy = async (payload) => {
  const res = await api.post(`/policies/`, payload);
  return res.data;
};

