const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { JWT_SECRET } = require('../config/env.config');

// Регистрация пользователя
exports.register = async (req, res) => {
  try {
    const { phone_number, full_name } = req.body;

    // Проверяем, существует ли пользователь
    const existingUser = await User.findOne({ where: { phone_number } });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже зарегистрирован' });
    }

    // Создаем нового пользователя
    const user = await User.create({ phone_number, full_name });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Ошибка при регистрации:', error.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Авторизация пользователя
exports.login = async (req, res) => {
  try {
    console.log('Получен запрос на вход с номером:', req.body.phone_number);

    const { phone_number } = req.body;

    // Находим пользователя
    const user = await User.findOne({ where: { phone_number } });
    if (!user) {
      console.log('Пользователь не найден:', phone_number);
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    console.log('Пользователь найден:', user);

    // Генерируем JWT-токен
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Токен сгенерирован:', token);

    res.json({ token });
  } catch (error) {
    console.error('Ошибка при входе:', error.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};