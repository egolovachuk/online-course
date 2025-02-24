import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerService } from '../api/authService';

const Register = () => {
  const [phone_number, setPhoneNumber] = useState('');
  const [full_name, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем данные на backend
      await registerService({ phone_number, full_name });
      navigate('/login'); // Перенаправляем на страницу входа
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте снова.');
    }
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Номер телефона"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ФИО"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;