'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        static associate(models) {
            // define association here
        }
    }
    Allcode.init(
        {
            name: DataTypes.STRING,
            valueEn: DataTypes.STRING,
            valueVi: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Specialty',
        }
    )
    return Allcode
}
