const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'edward',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'online_courses',
  logging: false, // Отключаем логирование SQL-запросов
});

module.exports = sequelize;