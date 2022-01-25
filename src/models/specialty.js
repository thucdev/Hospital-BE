'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        static associate(models) {
            // define association here
            Specialty.hasMany(models.specialtyTranslation, {
                // foreignKey: 'specialtyId',
                as: 'specialtyData',
            })

            // Specialty.hasMany(models.Doctor, {
            //     foreignKey: 'doctorId',
            //     as: 'specialtyDoctorData',
            // })
        }
    }
    Specialty.init(
        {
            // name: DataTypes.STRING,
            // languageId: DataTypes.INTEGER,
            // specialtyId: DataTypes.INTEGER,
            img: DataTypes.BLOB('long'),
            title: DataTypes.STRING,
            descriptionHTML: DataTypes.STRING,
            descriptionMarkdown: DataTypes.STRING,
            // doctorId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Specialty',
        }
    )
    return Specialty
}
