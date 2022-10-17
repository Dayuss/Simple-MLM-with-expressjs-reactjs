'use strict';
const {Model} = require('sequelize');
const moment = require('moment');
const  { v4: uuidv4 }  = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.hasMany(models.trxCard, {foreignKey: 'memberId', as: 'trx'});
      Member.hasOne(models.MemberNetwork, {foreignKey: 'memberId', as: 'network'});

    }
  }
  Member.init({
    memberId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    fullname: DataTypes.STRING,
    reffCode: DataTypes.STRING,
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
     hooks: {
        beforeCreate: (member, options) => {
          member.memberId = uuidv4();
        },
      },
      sequelize,
      modelName: 'Member',
      tableName: 'members',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
  });
  return Member;
};