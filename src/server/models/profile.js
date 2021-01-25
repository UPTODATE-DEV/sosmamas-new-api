'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          onDelete: 'cascade',
        }
      });
    }
  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    name: DataTypes.STRING,
    gender: {
      type:DataTypes.STRING,
      isIn: {
        args: ['M', 'F'],
        msg: "Le champ sexe doit être M ou F"
      },
      len: {
        args: [0,1],
        msg: "Le champ sexe ne doit pas depasser 1 caratere"
      },
    },
    userId: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isVerified: {
      type:DataTypes.BOOLEAN,
      defaultValue: 0
    },
    avatar: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};