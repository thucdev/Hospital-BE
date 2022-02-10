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
         // email: {
         //     allowNull: false,
         //     type: Sequelize.STRING,
         // },
         // password: {
         //     allowNull: false,
         //     type: Sequelize.STRING,
         // },
         // fullName: {
         //     type: Sequelize.STRING,
         // },
         // address: {
         //     type: Sequelize.STRING,
         // },
         // gender: {
         //     type: Sequelize.STRING,
         // },
         // phoneNumber: {
         //     type: Sequelize.STRING,
         // },
         // image: {
         //     type: Sequelize.BLOB('long'),
         // },
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
         specialtyId: {
            type: Sequelize.INTEGER,
         },
         scheduleId: {
            type: Sequelize.INTEGER,
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
      await queryInterface.dropTable("doctor_infos")
   },
}
