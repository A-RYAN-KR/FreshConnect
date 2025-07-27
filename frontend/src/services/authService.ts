import axios from 'axios';

const API_URL = `https://freshconnect-kuwy.onrender.com/api/users`;

export interface LoginCredentials {
  email: string;
  password: string;
}

export const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const getMe = async (token: string) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};