// src/services/orderService.ts

import axios from "axios";

const API_URL = `https://freshconnect-kuwy.onrender.com/api/orders`;

// Helper to get the auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

interface CreateOrderPayload {
  productId: string;
  quantity: number;
}

/**
 * Creates a new order.
 * @param payload - The data for the new order { productId, quantity }
 */
export const createOrder = async (payload: CreateOrderPayload) => {
  const response = await axios.post(API_URL, payload, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * Fetches the current vendor's orders.
 */
export const getMyOrders = async () => {
  const response = await axios.get(`${API_URL}/myorders`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * Fetches all incoming orders for the current supplier.
 */
export const getSupplierOrders = async () => {
  const response = await axios.get(`${API_URL}/supplier`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

/**
 * Updates the status of an order.
 * @param orderId The ID of the order to update.
 * @param status The new status.
 */
export const updateOrderStatus = async (orderId: string, status: string) => {
    const response = await axios.put(`${API_URL}/${orderId}/status`, { status }, {
        headers: getAuthHeaders(),
    });
    return response.data;
};