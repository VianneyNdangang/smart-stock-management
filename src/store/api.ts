import { user_token } from '@/helpers/constant';
import axios from 'axios';

 export const apiClient = axios.create({
  // baseURL: 'http://192.168.1.38:5000/api/v1',
  baseURL: "http://localhost:8080/",
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Optionnel : Injecter automatiquement un token d'authentification
apiClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem(user_token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
