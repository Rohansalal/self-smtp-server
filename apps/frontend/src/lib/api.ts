import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const emailApi = {
  send: (data: any) => apiClient.post('/email/send', data),
  list: (params?: any) => apiClient.get('/emails', { params }),
  getById: (id: number) => apiClient.get(`/emails/${id}`),
};

export const campaignApi = {
  list: (params?: any) => apiClient.get('/campaigns', { params }),
  getById: (id: number) => apiClient.get(`/campaigns/${id}`),
  create: (data: any) => apiClient.post('/campaigns', data),
  delete: (id: number) => apiClient.delete(`/campaigns/${id}`),
  start: (id: number) => apiClient.post(`/campaigns/${id}/start`),
};

export const contactApi = {
  list: (params?: any) => apiClient.get('/contacts', { params }),
  create: (data: any) => apiClient.post('/contacts', data),
  delete: (id: number) => apiClient.delete(`/contacts/${id}`),
  importCSV: (csv: string) => apiClient.post('/contacts/import', { csv }),
};

export default apiClient;
