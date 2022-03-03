"use strict"
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("doctor_infos", {
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
            type: Sequelize.LONGTEXT,
         },
         certificate: {
            type: Sequelize.LONGTEXT,
         },
         experience: {
            type: Sequelize.LONGTEXT,
         },
         degree: {
            type: Sequelize.LONGTEXT,
         },
         member: {
            type: Sequelize.LONGTEXT,
         },
         field: {
            type: Sequelize.LONGTEXT,
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
      await queryInterface.dropTable("doctor_infos")
   },
}
