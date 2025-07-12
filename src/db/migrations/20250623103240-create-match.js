"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("matchs", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      p1: {
        type: Sequelize.UUID,
      },
      p2: {
        type: Sequelize.UUID,
      },
      skill_level: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      winner_fk: {
        type: Sequelize.UUID,
      },
      loser_fk: {
        type: Sequelize.UUID,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("matchs");
  },
};
