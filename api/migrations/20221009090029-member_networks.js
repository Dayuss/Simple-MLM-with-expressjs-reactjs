'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('member_networks', {
      networkId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        field: 'network_id'
      },
      parentNetworkId: {
        type: Sequelize.UUID,
        field: 'parent_network_id'
      },
      memberId: {
        allowNull: false,
        type: Sequelize.UUID,
        field: 'member_id'
      },
      uplineId: {
        type: Sequelize.UUID,
        field: 'upline_id'
      },
      hierarchyLevel:{
        type: Sequelize.INTEGER,
        field: 'hierarchy_level'
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
    await queryInterface.dropTable('member_networks');
  }
};