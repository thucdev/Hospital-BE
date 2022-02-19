"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class News extends Model {
      static associate(models) {}
   }
   News.init(
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
         modelName: "News",
      }
   )
   return News
}
