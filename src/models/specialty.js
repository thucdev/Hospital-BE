"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class Specialty extends Model {
      static associate(models) {
         // define association here
         Specialty.hasMany(models.specialty_translation, {
            // foreignKey: 'specialtyId',
            as: "translationData",
         })

         Specialty.hasMany(models.User, {
            foreignKey: "specialtyId",
            as: "specialtyData",
         })
      }
   }
   Specialty.init(
      {
         // name: DataTypes.STRING,
         // languageId: DataTypes.INTEGER,
         // specialtyId: DataTypes.INTEGER,
         img: DataTypes.BLOB("long"),
         title: DataTypes.STRING,
         descriptionHTML: DataTypes.TEXT,
         descriptionMarkdown: DataTypes.TEXT,
         // doctorId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: "Specialty",
      }
   )
   return Specialty
}
