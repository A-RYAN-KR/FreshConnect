// src/services/productService.ts

import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`; // Replace with your backend URL

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data; // Assuming the API returns { success: true, products: [...] }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw the error to be handled in the component
  }
};