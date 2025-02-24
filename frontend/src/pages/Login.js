import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login as loginService } from '../api/authService';

const Login = () => {
  const { login } = useAuth(); // Получаем метод login из контекста
  const [phone_number, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем, что номер телефона не пустой
    if (!phone_number.trim()) {
      setError('Введите номер телефона.');
      return;
    }

    try {
      console.log('Отправляем запрос с номером:', phone_number); // Логируем номер телефона
      const response = await loginService(phone_number); // Отправляем запрос на backend
      console.log('Ответ от backend:', response); // Логируем ответ

      // Проверяем, что токен существует
      if (!response.token) {
        throw new Error('Токен не получен');
      }

      login(response.token); // Сохраняем токен
    } catch (err) {
      console.error('Ошибка при входе:', err); // Логируем ошибку
      setError('Ошибка авторизации. Проверьте номер телефона.');
    }
  };

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Номер телефона"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;