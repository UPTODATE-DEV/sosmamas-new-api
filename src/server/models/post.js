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
      Post.belongsTo(models.PostTag, {
        foreignKey: {
          name: 'tagId', as:'tag',
          onDelete: 'cascade',
        }
      });
      Post.belongsTo(models.User, {
        foreignKey: {
          name: 'authorId',as:'user',
          onDelete: 'cascade',
        }
      });
      Post.hasMany(models.Comment);
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tagId: {
      type: DataTypes.STRING,
      field: 'tagId',
      allowNull: false
    },
    authorId: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};