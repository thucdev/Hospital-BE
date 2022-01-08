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
            keyMap: DataTypes.STRING,
            type: DataTypes.STRING,
            valueEn: DataTypes.STRING,
            valueVi: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Role',
        }
    )
    return Allcode
}
