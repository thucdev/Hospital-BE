'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            fullName: {
                type: Sequelize.STRING,
            },

            // lastName: {
            //     type: Sequelize.STRING,
            // },
            address: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.STRING,
            },
            phoneNumber: {
                type: Sequelize.STRING,
            },
            roleId: {
                allowNull: false,
                type: Sequelize.STRING,
            },

            questionId: {
                type: Sequelize.INTEGER,
            },
            feedbackId: {
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.BLOB('long'),
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
        await queryInterface.dropTable('users')
    },
}