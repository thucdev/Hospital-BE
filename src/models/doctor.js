'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Doctor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Doctor.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            fullName: DataTypes.STRING,
            address: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            gender: DataTypes.STRING,
            image: DataTypes.BLOB('long'),
            language: DataTypes.STRING,
            experience: DataTypes.STRING,
            certificate: DataTypes.STRING,
            member: DataTypes.STRING,
            field: DataTypes.STRING,
            roleId: DataTypes.STRING,
            specialtyId: DataTypes.INTEGER,
            scheduleId: DataTypes.INTEGER,
        },

        {
            sequelize,
            modelName: 'Doctor',
        }
    )
    return Doctor
}
