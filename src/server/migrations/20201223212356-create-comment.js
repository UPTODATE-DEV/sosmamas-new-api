'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Posts', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
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
    await queryInterface.dropTable('Comments');
  }
};