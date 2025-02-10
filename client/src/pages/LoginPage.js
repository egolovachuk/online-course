import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Отправляем запрос на сервер для авторизации
      const response = await axios.post('http://localhost:5000/login', { phone });
      const token = response.data.token;

      // Сохраняем токен в localStorage
      localStorage.setItem('token', token);

      // Переходим в личный кабинет
      navigate('/profile');
    } catch (error) {
      alert('Ошибка авторизации. Проверьте номер телефона.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Авторизация</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Введите номер телефона"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Войти
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  form: {
    display: 'inline-block',
    textAlign: 'left',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '250px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default LoginPage;