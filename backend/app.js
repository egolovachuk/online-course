const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config');
const envConfig = require('./config/env.config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // Новый маршрут для данных пользователя

// Запуск сервера
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных успешно установлено');

    app.listen(envConfig.PORT, () => {
      console.log(`Сервер запущен на порту ${envConfig.PORT}`);
    });
  } catch (error) {
    console.error('Не удалось подключиться к базе данных:', error);
  }
};

startServer();