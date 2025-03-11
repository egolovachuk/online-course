import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerService } from '../api/authService';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      // Отправляем данные на backend
      await registerService({ phone_number: data.phone_number, full_name: data.full_name });
      navigate('/login'); // Перенаправляем на страницу входа
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      throw new Error('Ошибка регистрации. Попробуйте снова.');
    }
  };

  return (
    <div>
      {/* Используем универсальный компонент AuthForm */}
      <AuthForm isLogin={false} onSubmit={handleSubmit} />
    </div>
  );
};

export default Register;