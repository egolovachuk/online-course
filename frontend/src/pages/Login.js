import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext'; // Импортируем хук useAuth

const Login = () => {
  const { login } = useAuth();

  const handleLogin = (newToken) => {
    console.log('Пользователь вошел в систему');
    console.log('Вызываем метод login из контекста с токеном:', newToken);
    login(newToken); // Вызываем метод login из контекста
  };

  return <AuthForm onLogin={handleLogin} />;
};

export default Login;