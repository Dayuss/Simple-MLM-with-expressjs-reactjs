'use strict';
const {Model} = require('sequelize');
const moment = require('moment');
const  { v4: uuidv4 }  = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class MemberNetwork extends Model {
    static associate(models) {
      MemberNetwork.belongsTo(models.Member, {foreignKey: 'memberId', as: 'member'});
      MemberNetwork.belongsTo(models.Member, {foreignKey: 'uplineId', as: 'upline'});

    }
  }
  MemberNetwork.init({
    networkId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    parentNetworkId: DataTypes.UUID,
    memberId: DataTypes.UUID,
    uplineId: DataTypes.UUID,
    hierarchyLevel: DataTypes.INTEGER,
    createdAt : {
        type : DataTypes.DATE,
        get : function() {
            return this.getDataValue('createdAt') != null ? moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss') : null
        }
    },
    updatedAt : {
        type : DataTypes.DATE,
        get : function() {
            return this.getDataValue('updatedAt') != null ? moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss') : null
        }
    },
  }, {
    hierarchy: true,
     hooks: {
        beforeCreate: (member, options) => {
          member.networkId = uuidv4();
        },
      },
      sequelize,
      modelName: 'MemberNetwork',
      tableName: 'member_networks',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
  });
  return MemberNetwork;
};