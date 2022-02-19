"use strict"
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("news", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         img: {
            type: Sequelize.BLOB("long"),
            allowNull: true,
         },
         // doctorId: {
         //     type: Sequelize.INTEGER,
         // },
         title: {
            type: Sequelize.STRING,
         },
         descriptionHTML: {
            type: Sequelize.TEXT,
         },
         descriptionMarkdown: {
            type: Sequelize.TEXT,
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
      await queryInterface.dropTable("news")
   },
}