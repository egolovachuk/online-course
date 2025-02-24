module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Курс по JavaScript',
        price: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Курс по React',
        price: 1500,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  },
};