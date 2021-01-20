'use strict';
import models from '../models';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.User.create({
      username: 'sos-mamas-admin',
      password: "@sos-mamas#Admin",
      phone: "+243987654321",
    });
  //  await queryInterface.bulkInsert('Users', [], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
