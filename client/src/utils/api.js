import axios from 'axios';

// API base URL - change this for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor (for adding auth tokens in future)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for handling errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login if needed
      localStorage.removeItem('adminToken');
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const bookingAPI = {
  getAll: () => api.get('/api/bookings'),
  getById: (id) => api.get(`/api/bookings/${id}`),
  create: (data) => api.post('/api/bookings', data),
  update: (id, data) => api.patch(`/api/bookings/${id}`, data),
  delete: (id) => api.delete(`/api/bookings/${id}`),
};

export const adminAPI = {
  login: (credentials) => api.post('/api/admin/login', credentials),
};

export default api;
