import React, { useState } from 'react';
import { register, login } from '../api/authService';

const AuthForm = ({ onLogin }) => {
  const [phone_number, setPhoneNumber] = useState('');
  const [full_name, setFullName] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(phone_number, full_name);
      } else {
        const { token } = await login(phone_number);
        localStorage.setItem('token', token);
        onLogin();
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка авторизации');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
      {isRegister && (
        <input
          type="text"
          placeholder="ФИО"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
      )}
      <input
        type="text"
        placeholder="Номер телефона"
        value={phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button type="submit" style={{ padding: '10px 20px' }}>
        {isRegister ? 'Зарегистрироваться' : 'Войти'}
      </button>
      <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: 'pointer', marginTop: '10px' }}>
        {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
      </p>
    </form>
  );
};

export default AuthForm;