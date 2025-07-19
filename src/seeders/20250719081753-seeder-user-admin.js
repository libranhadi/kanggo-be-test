'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('P@ssword', 10); 

    await queryInterface.bulkInsert(
      { tableName: 'users', schema: 'kanggo' },
      [
        {
          full_name: 'John Doe',
          phone_number: '081319811641',
          email: 'john@example.com',
          role_id: 1,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'users', schema: 'kanggo' }, null, {});
  }
};
