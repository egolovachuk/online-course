import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Создаем контекст аутентификации
const AuthContext = createContext();

// Провайдер контекста
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Получаем токен из localStorage
  const navigate = useNavigate(); // Хук для навигации

  // Сохраняем токен в localStorage при его изменении
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Метод для входа
  const login = (newToken) => {
    localStorage.setItem('token', newToken); // Убедитесь, что токен сохраняется
    setToken(newToken); // Устанавливаем токен
    navigate('/dashboard'); // Перенаправляем на страницу дашборда
  };

  // Метод для выхода
  const logout = () => {
    setToken(null); // Очищаем токен
    navigate('/login'); // Перенаправляем на страницу входа
  };

  // Проверка токена при загрузке приложения
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true }); // Перенаправляем на страницу входа, если токен отсутствует
    }
  }, [token, navigate]);

  // Значение контекста
  const contextValue = {
    token, // Текущий токен
    login, // Метод для входа
    logout, // Метод для выхода
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста
export const useAuth = () => useContext(AuthContext);