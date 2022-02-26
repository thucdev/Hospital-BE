"use strict"
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("schedules", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         reason: {
            type: Sequelize.STRING,
         },
         timeBooked: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         dateBooked: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         status: {
            type: Sequelize.STRING,
         },
         patientId: {
            type: Sequelize.INTEGER,
         },
         doctorId: {
            type: Sequelize.INTEGER,
         },
         token: {
            type: Sequelize.STRING,
         },

         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      })
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("schedules")
   },
}
