'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema('INV');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropSchema('INV');
  },
};
