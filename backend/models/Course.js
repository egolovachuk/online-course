const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true, // Использование snake_case вместо camelCase
  tableName: 'Courses', // Явно указываем имя таблицы
});

Course.associate = (models) => {
  // Установите связь один-ко-многим: Course → Modules
  Course.hasMany(models.Module, { foreignKey: 'courseId' });
};

return Course;

module.exports = Course;