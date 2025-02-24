module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Submodules', [
      {
        module_id: 1,
        title: 'Переменные и типы данных',
        content: 'Изучите переменные и типы данных в JavaScript.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        module_id: 1,
        title: 'Условные операторы',
        content: 'Научитесь использовать условные операторы.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Submodules', null, {});
  },
};