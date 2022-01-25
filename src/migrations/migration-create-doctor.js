'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctors', {
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
            address: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.STRING,
            },
            phoneNumber: {
                type: Sequelize.STRING,
            },
            language: {
                type: Sequelize.STRING,
            },
            certificate: {
                type: Sequelize.STRING,
            },
            experience: {
                type: Sequelize.STRING,
            },
            member: {
                type: Sequelize.STRING,
            },
            field: {
                type: Sequelize.STRING,
            },
            roleId: {
                allowNull: false,
                type: Sequelize.STRING,
            },

            specialtyId: {
                type: Sequelize.INTEGER,
            },
            scheduleId: {
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
        await queryInterface.dropTable('doctors')
    },
}
