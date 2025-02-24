module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Modules', [
      {
        course_id: 1,
        title: 'Основы JavaScript',
        content: 'В этом модуле вы изучите основы JavaScript.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        course_id: 1,
        title: 'Работа с DOM',
        content: 'В этом модуле вы научитесь работать с DOM.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Modules', null, {});
  },
};