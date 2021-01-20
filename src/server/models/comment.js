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
        foreignKey: {
          name: 'postId',
          onDelete: 'cascade',
        }
      });
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          onDelete: 'cascade',
        }
      });
    }
  }
  Comment.init({
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.STRING,
      field: 'userId',
    },
    postId: {
      type: DataTypes.STRING,
      field: 'postId',
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};