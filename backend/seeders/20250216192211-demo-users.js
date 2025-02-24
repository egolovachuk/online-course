module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        phone_number: '123456789',
        full_name: 'John Doe',
        device_id: 'device_1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        phone_number: '987654321',
        full_name: 'Jane Smith',
        device_id: 'device_2',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};