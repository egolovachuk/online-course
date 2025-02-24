import axios from 'axios';

// Создаем экземпляр Axios с базовым URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Добавляем интерцептор для автоматического добавления токена
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовки
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;