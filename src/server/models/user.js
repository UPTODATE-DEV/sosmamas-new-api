'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
      User.hasMany(models.Comment);
      User.hasMany(models.Post);
      models.User.belongsTo(models.User);
    }
  };
  User.init({
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      notEmpty: true,
    },
    username: {
      type:DataTypes.STRING,
      defaultValue: 'sos-user'+this.phone
    },
    isVerified: {
      type:DataTypes.BOOLEAN,
      defaultValue: 'sos-user'+this.phone
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    password: {
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};