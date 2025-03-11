module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define('Module', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('completed', 'in-progress', 'locked'),
        defaultValue: 'locked',
      },
    });
  
    Module.associate = (models) => {
      // Установите связь один-ко-многим: Course → Modules
      Module.belongsTo(models.Course, { foreignKey: 'courseId' });
    };
  
    return Module;
  };