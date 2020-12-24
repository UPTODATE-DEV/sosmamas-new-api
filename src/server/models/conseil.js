'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conseil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Conseil.init({
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    periodeId: { 
      type: DataTypes.INTEGER,
      field: 'periodeId',
    }
  }, {
    sequelize,
    modelName: 'Conseil',
  });
  Conseil.associate = (models) => {
    models.Conseil.belongsTo(models.Periode, {
      onDelete: 'cascade',
    });
  };
  return Conseil;
};