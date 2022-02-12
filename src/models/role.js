"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class Role extends Model {
      static associate(models) {
         // define association here
         Role.hasMany(models.Schedule, { foreignKey: "timeBooked", as: "timeData" })
      }
   }
   Role.init(
      {
         keyMap: DataTypes.STRING,
         type: DataTypes.STRING,
         valueEn: DataTypes.STRING,
         valueVi: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Role",
      }
   )
   return Role
}
