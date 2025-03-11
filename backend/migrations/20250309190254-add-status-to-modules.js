module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Modules', 'status', {
      type: Sequelize.ENUM('completed', 'in-progress', 'locked'),
      defaultValue: 'locked',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Modules', 'status');
  },
};