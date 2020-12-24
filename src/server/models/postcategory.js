'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PostCategory.hasMany(models.Post);
    }
  };
  PostCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PostCategory',categoryId: {
        type: DataTypes.STRING,
        references: {
          model: 'PostCategory', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      }
  });
  return PostCategory;
};