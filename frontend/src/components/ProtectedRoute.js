import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const storedToken = localStorage.getItem('token');

  console.log('Проверяем токен в ProtectedRoute:', token || storedToken);

  if (!token && !storedToken) {
    console.log('Токена нет. Перенаправляем на /login');
    return <Navigate to="/login" replace />;
  }

  console.log('Токен найден. Отображаем защищенный контент');
  return children;
};

export default ProtectedRoute;