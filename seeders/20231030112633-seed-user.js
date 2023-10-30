'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const users = require("../data/user.json");
    users.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    })

    await queryInterface.bulkInsert("Users", users);
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
    });

  }
};
