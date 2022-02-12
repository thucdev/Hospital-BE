"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class Doctor_info extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Doctor_info.belongsTo(models.User, {
            foreignKey: "doctorId",
            targetKey: "id",
            as: "doctor_infoData",
         })
      }
   }
   Doctor_info.init(
      {
         // email: DataTypes.STRING,
         // password: DataTypes.STRING,
         // fullName: DataTypes.STRING,
         // address: DataTypes.STRING,
         // phoneNumber: DataTypes.STRING,
         // gender: DataTypes.STRING,
         // image: DataTypes.BLOB('long'),
         doctorId: DataTypes.INTEGER,
         language: DataTypes.STRING,
         experience: DataTypes.JSON,
         certificate: DataTypes.JSON,
         degree: DataTypes.JSON,
         member: DataTypes.JSON,
         field: DataTypes.JSON,
         // specialtyId: DataTypes.INTEGER,
         // scheduleId: DataTypes.INTEGER,
      },

      {
         sequelize,
         modelName: "Doctor_info",
      }
   )
   return Doctor_info
}
