'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          onDelete: 'cascade',
        }
      });
    }
  }
  Like.init({
    userId: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    resourceId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};