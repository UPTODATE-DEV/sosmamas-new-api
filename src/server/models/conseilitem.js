'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConseilItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ConseilItem.belongsTo(models.Conseil, {
        onDelete: 'cascade',
      });
      models.ConseilItem.belongsTo(models.Periode, {
        onDelete: 'cascade',
      });
    }
  }
  ConseilItem.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    image: DataTypes.STRING,
    conseilId: DataTypes.INTEGER,
    periodeId: DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'ConseilItem',
  });
  return ConseilItem;
};