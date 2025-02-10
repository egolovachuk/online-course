const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Подключение к PostgreSQL
const pool = new Pool({
  user: 'edward',
  host: 'localhost',
  database: 'online_courses',
  password: '',
  port: 5432,
});

// Секретный ключ для JWT
const JWT_SECRET = 'your_jwt_secret';

// Регистрация пользователя
app.post('/register', async (req, res) => {
  const { phone, fullName } = req.body;
  const hashedPhone = await bcrypt.hash(phone, 10);

  try {
    await pool.query('INSERT INTO users (phone, full_name) VALUES ($1, $2)', [hashedPhone, fullName]);
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Registration failed' });
  }
});

// Авторизация пользователя
app.post('/login', async (req, res) => {
  const { phone } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    if (result.rows.length === 0) return res.status(404).send({ error: 'User not found' });

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (err) {
    res.status(500).send({ error: 'Login failed' });
  }
});

// Получение прогресса пользователя
app.get('/progress/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT progress FROM user_progress WHERE user_id = $1', [userId]);
    res.send(result.rows[0]?.progress || {});
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch progress' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));

require('dotenv').config();
const PORT = process.env.PORT || 5000;