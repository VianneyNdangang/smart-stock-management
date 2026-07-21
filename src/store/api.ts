import axios from 'axios';

 export const apiClient = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Optionnel : Injecter automatiquement un token d'authentification
apiClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
