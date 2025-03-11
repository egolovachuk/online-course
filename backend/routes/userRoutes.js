const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware для проверки JWT

const router = express.Router();

// Получение профиля пользователя
router.get('/profile', authMiddleware, userController.getUserProfile);

// Получение купленных курсов пользователя
router.get('/courses', authMiddleware, userController.getUserCourses);

// Получение модулей курса
router.get('/courses/:id/modules', authMiddleware, userController.getCourseModules);

module.exports = router;