const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  device_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  underscored: true, // Используем snake_case вместо camelCase
});

module.exports = User;