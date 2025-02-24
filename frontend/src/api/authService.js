import axios from 'axios';
import axiosInstance from './axiosInstance';

export const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

export const login = async (phone_number) => {
  const response = await axiosInstance.post('/auth/login', { phone_number });
  return response.data;
};

// export const login = async (phone_number) => {
//   try {
//     console.log('Отправляем запрос на:', `${API_URL}/auth/login`);
//     console.log('Тело запроса:', { phone_number });

//     const response = await axios.post(`${API_URL}/auth/login`, { phone_number });
//     console.log('Ответ от backend:', response.data);

//     return response.data;
//   } catch (error) {
//     console.error('Ошибка при входе:', error.response?.data || error.message);
//     throw error;
//   }
// };