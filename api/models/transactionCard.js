'use strict';
const {Model} = require('sequelize');
const moment = require('moment');
const  { v4: uuidv4 }  = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class TrxCard extends Model {
    static associate(models) {
      TrxCard.hasOne(models.Member, {foreignKey: 'memberId', as: 'member'});
    }
  }
  TrxCard.init({
    trxId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    memberId: DataTypes.UUID,
    trxIn: DataTypes.NUMERIC,
    trxOut: DataTypes.NUMERIC,
    note: DataTypes.STRING,
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
        beforeCreate: (column, options) => {
          column.trxId = uuidv4();
        },
      },
      sequelize,
      modelName: 'trxCard',
      tableName: 'transaction_cards',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
  });
  return TrxCard;
};