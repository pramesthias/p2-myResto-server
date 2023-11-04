'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cuisines = require("../data/cuisine.json");
    cuisines.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    })

    await queryInterface.bulkInsert("Cuisines", cuisines);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cuisines", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
