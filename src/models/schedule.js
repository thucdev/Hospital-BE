'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Schedule.init(
        {
            fullName: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            email: DataTypes.STRING,
            reason: DataTypes.STRING,
            status: DataTypes.STRING,
            timeBooked: DataTypes.STRING,
            dateBooked: DataTypes.STRING,
            // specialtyId: DataTypes.INTEGER,
            patientId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Schedule',
        }
    )
    return Schedule
}
