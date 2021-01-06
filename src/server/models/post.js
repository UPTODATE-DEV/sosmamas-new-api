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
        onDelete: 'cascade',
      });
      Post.hasOne(models.User, {
        foreignKey: {
          name: 'authorId',
          onDelete: 'cascade',
        }
      });
      Post.hasMany(models.Comment);
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: {
      type: DataTypes.STRING,
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