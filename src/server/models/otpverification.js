'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtpVerification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OtpVerification.init({
    credetial: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    otpCode: DataTypes.STRING,
    isVerifed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'OtpVerification',
  });
  return OtpVerification;
};