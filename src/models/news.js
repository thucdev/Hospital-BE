"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class News extends Model {
      static associate(models) {}
   }
   News.init(
      {
         img: DataTypes.BLOB("long"),
         title: DataTypes.STRING,
         descriptionHTML: DataTypes.TEXT,
         descriptionMarkdown: DataTypes.TEXT,
      },
      {
         sequelize,
         modelName: "News",
      }
   )
   return News
}
