"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         User.hasMany(models.Doctor_info, {
            foreignKey: "doctorId",
            as: "doctor_infoData",
         })

         User.hasMany(models.Schedule, { foreignKey: "patientId", as: "patientData" })
         User.hasMany(models.Schedule, { foreignKey: "doctorId", as: "doctorData" })
         User.belongsTo(models.Specialty, {
            foreignKey: "specialtyId",
            targetKey: "id",
            as: "specialtyData",
         })
      }
   }
   User.init(
      {
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         fullName: DataTypes.STRING,
         address: DataTypes.STRING,
         phoneNumber: DataTypes.STRING,
         gender: DataTypes.STRING,
         image: DataTypes.BLOB("long"),
         roleId: DataTypes.STRING,
         specialtyId: DataTypes.STRING,
         questionId: DataTypes.INTEGER,
         feedbackId: DataTypes.INTEGER,
      },

      {
         sequelize,
         modelName: "User",
      }
   )
   return User
}
