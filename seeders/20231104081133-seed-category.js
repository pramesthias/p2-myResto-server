'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = require("../data/category.json");
    categories.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    })

    await queryInterface.bulkInsert("Categories", categories);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
