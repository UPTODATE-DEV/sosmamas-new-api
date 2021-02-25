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
        args: ['Homme', 'Femme'],
        msg: "Le champ sexe doit être Homme ou Femme"
      },
    },
    userId: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    specialty: {
      type: DataTypes.STRING,
      defaultValue: "Non spécifiée"
    },
    isVerified: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    avatar: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};