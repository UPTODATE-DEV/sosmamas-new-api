'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.belongsTo(models.PostCategory, {
        onDelete: 'cascade',
      });
      Post.hasMany(models.Comment);
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    categoryId: {
      type: DataTypes.STRING,
      field: 'categoryId',
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};