import React, { useState } from 'react';
import { register, login } from '../api/authService';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';

const AuthForm = ({ onLogin }) => {
  const [phone_number, setPhoneNumber] = useState('');
  const [full_name, setFullName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;

      if (isRegister) {
        console.log('Отправляем запрос на регистрацию:', { phone_number, full_name });
        response = await register({ phone_number, full_name });
      } else {
        console.log('Отправляем запрос на вход:', { phone_number });
        response = await login(phone_number);
      }

      if (!response || !response.token) {
        throw new Error('Ошибка: Токен не получен');
      }

      localStorage.setItem('token', response.token);
      console.log('Токен сохранен в localStorage:', response.token);
      onLogin(response.token);
    } catch (error) {
      console.error('Ошибка при авторизации:', error.message);
      alert(`Ошибка: ${error.message}. Попробуйте снова.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 4,
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" align="center">
          {isRegister ? 'Регистрация' : 'Вход'}
        </Typography>

        {isRegister && (
          <TextField
            label="ФИО"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            required
          />
        )}

        <TextField
          label="Номер телефона"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          {isLoading ? 'Загрузка...' : isRegister ? 'Зарегистрироваться' : 'Войти'}
        </Button>

        <Typography
          align="center"
          onClick={() => setIsRegister(!isRegister)}
          sx={{ cursor: 'pointer', color: 'primary.main' }}
        >
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthForm;