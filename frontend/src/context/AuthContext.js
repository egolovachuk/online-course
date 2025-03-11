import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const login = (newToken) => {
    if (!newToken) {
      console.error('Ошибка: Токен не передан в метод login');
      return;
    }
  
    localStorage.setItem('token', newToken);
    setToken(newToken);
    console.log('Токен установлен:', newToken);
  
    // Задержка для обновления состояния
    setTimeout(() => {
      console.log('Перенаправляем на /dashboard');
      navigate('/dashboard');
    }, 0);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  useEffect(() => {
    if (!token && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      console.log('Токена нет. Перенаправляем на /login');
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      console.log('Токен найден. Перенаправляем на /dashboard');
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);