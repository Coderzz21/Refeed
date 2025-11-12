import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token if present in localStorage
api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch (err) {
    // ignore
  }
  return config;
});

export default api;
