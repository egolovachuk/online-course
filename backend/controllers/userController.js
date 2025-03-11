const db = require('../models'); // Предполагаем, что модели Sequelize находятся здесь

// Получение профиля пользователя
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ID пользователя из токена
    const user = await db.User.findByPk(userId, {
      attributes: ['id', 'phone', 'name'], // Выбираем только нужные поля
    });

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении профиля' });
  }
};

// Получение купленных курсов пользователя
exports.getUserCourses = async (req, res) => {
    try {
      const userId = req.userId;
      const courses = await db.UserCourse.findAll({
        where: { userId },
        include: [
          {
            model: db.Course,
            include: [
              {
                model: db.Module, // Включаем модули
                attributes: ['id', 'title', 'status'],
              },
            ],
          },
        ],
      });
  
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка при получении курсов' });
    }
  };

// Получение модулей курса
exports.getCourseModules = async (req, res) => {
  try {
    const courseId = req.params.id; // ID курса из URL
    const modules = await db.Module.findAll({
      where: { courseId },
    });

    res.json(modules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении модулей' });
  }
};