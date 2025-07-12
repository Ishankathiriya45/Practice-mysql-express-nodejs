"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("groupmembers", "user_fk", {
      type: Sequelize.UUID,
      after: "group_fk",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("groupmembers", "user_fk");
  },
};
