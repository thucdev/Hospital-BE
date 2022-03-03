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
         doctorId: DataTypes.INTEGER,
         language: DataTypes.STRING,
         experience: DataTypes.LONGTEXT,
         certificate: DataTypes.LONGTEXT,
         degree: DataTypes.LONGTEXT,
         member: DataTypes.LONGTEXT,
         field: DataTypes.LONGTEXT,
      },

      {
         sequelize,
         modelName: "Doctor_info",
      }
   )
   return Doctor_info
}
