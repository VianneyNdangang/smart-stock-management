import { user_token } from '@/helpers/constant';
import axios from 'axios';
import { useRouter } from 'vue-router';

 export const apiClient = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem(user_token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error)
},
);

apiClient.interceptors.response.use(
  (Response) => {
    return Response;
  },
  async (error) => {
    if (error) {
      const originalRequest: any = error.config;
      // Token expired
      if (error.response?.status == 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          localStorage.removeItem(user_token);
          useRouter().push('/login')
        } catch (error) {
          return Promise.reject(error)
        }
      }
    }
    return Promise.reject(error)
  }
)