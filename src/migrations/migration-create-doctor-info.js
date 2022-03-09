"use strict"
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Doctor_infos", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         doctorId: {
            type: Sequelize.INTEGER,
         },
         language: {
            type: Sequelize.JSON,
         },
         certificate: {
            type: Sequelize.JSON,
         },
         experience: {
            type: Sequelize.JSON,
         },
         degree: {
            type: Sequelize.JSON,
         },
         member: {
            type: Sequelize.JSON,
         },
         field: {
            type: Sequelize.JSON,
         },
         // specialtyId: {
         //    type: Sequelize.INTEGER,
         // },
         // scheduleId: {
         //    type: Sequelize.INTEGER,
         // },

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
      await queryInterface.dropTable("Doctor_infos")
   },
}
