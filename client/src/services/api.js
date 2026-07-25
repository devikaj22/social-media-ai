import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Bearer token to all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Endpoints
export const signupAPI = async (payload) => {
  const response = await api.post('/auth/signup', payload);
  return response.data;
};

export const loginAPI = async (payload) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

export const getMeAPI = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Calendar Endpoints
export const generateCalendarAPI = async (formData) => {
  const response = await api.post('/generate', formData);
  return response.data;
};

export const saveCalendarAPI = async (payload) => {
  const response = await api.post('/calendars', payload);
  return response.data;
};

export const getAllCalendarsAPI = async () => {
  const response = await api.get('/calendars');
  return response.data;
};

export const getCalendarByIdAPI = async (id) => {
  const response = await api.get(`/calendars/${id}`);
  return response.data;
};

export const deleteCalendarAPI = async (id) => {
  const response = await api.delete(`/calendars/${id}`);
  return response.data;
};

export default api;
