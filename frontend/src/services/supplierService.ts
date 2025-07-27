// src/services/supplierService.ts

import axios from "axios";

// Assuming your suppliers are fetched from the users endpoint
const API_URL = `https://freshconnect-kuwy.onrender.com/api/users`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Fetches all users with the role of 'supplier'.
 * This assumes your backend has a route like GET /api/users/suppliers
 */
export const getAllSuppliers = async () => {
  // IMPORTANT: You might need to adjust this URL to match your actual backend route
  const response = await axios.get(`${API_URL}/suppliers`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};