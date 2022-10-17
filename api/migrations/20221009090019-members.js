'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('members', {
      memberId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        field: 'member_id'
      },
      fullname: {
        type: Sequelize.STRING,
      },
      reffCode: {
        type: Sequelize.STRING,
        field: 'reff_code'
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('members');
  }
};