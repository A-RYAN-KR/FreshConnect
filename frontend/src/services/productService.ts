// src/services/productService.ts

import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Helper to get the auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Fetches all products from the server.
 */
export const getAllProducts = async () => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * Creates a new product.
 * @param productData - The data for the new product, sent as FormData.
 */
export const createProduct = async (productData: FormData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Content-Type' is set automatically by browser for FormData
    },
  });
  return response.data;
};

/**
 * Updates an existing product.
 * @param id - The ID of the product to update.
 * @param productData - The updated data, sent as FormData.
 */
export const updateProduct = async (id: string, productData: FormData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData, {
    headers: getAuthHeaders(),
    // 'Content-Type' is set by the browser for FormData
  });
  return response.data;
};

/**
 * Deletes a product.
 * @param id - The ID of the product to delete.
 */
export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
