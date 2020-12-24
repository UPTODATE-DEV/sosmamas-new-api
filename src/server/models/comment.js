'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Comment.belongsTo(models.Post, {
        onDelete: 'cascade',
      });
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    postId: {
      type: DataTypes.STRING,
      field: 'postId',
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};