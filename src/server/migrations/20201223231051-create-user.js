'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        notEmpty: true,
        // is: {
        //   args: ["^[0-9]+$", "+"],
        //   msg: "Le champ phone doit contenir des valeur numeric"
        // }
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};