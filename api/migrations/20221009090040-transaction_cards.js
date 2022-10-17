'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaction_cards', {
      trxId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        field: 'trx_id'
      },
      memberId:{
        type: Sequelize.UUID,
        field: 'member_id'
      },
      trxIn: {
        type: Sequelize.NUMERIC,
        field: 'trx_in'
      },
      trxOut: {
        type: Sequelize.NUMERIC,
        field: 'trx_out'
      },
      note: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('transaction_cards');
  }
};