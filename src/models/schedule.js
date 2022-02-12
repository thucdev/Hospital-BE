"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class Schedule extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here

         Schedule.belongsTo(models.Role, {
            foreignKey: "timeBooked",
            targetKey: "keyMap",
            as: "timeTypeData",
         })
         Schedule.belongsTo(models.User, {
            foreignKey: "doctorId",
            targetKey: "id",
            as: "doctorData",
         })
         Schedule.belongsTo(models.User, {
            foreignKey: "patientId",
            targetKey: "id",
            as: "patientData",
         })
      }
   }
   Schedule.init(
      {
         // fullName: DataTypes.STRING,
         // phoneNumber: DataTypes.STRING,
         // email: DataTypes.STRING,
         reason: DataTypes.STRING,
         status: DataTypes.STRING,
         timeBooked: DataTypes.STRING,
         dateBooked: DataTypes.STRING,
         // specialtyId: DataTypes.INTEGER,
         patientId: DataTypes.INTEGER,
         doctorId: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: "Schedule",
      }
   )
   return Schedule
}
