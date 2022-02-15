"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
   class specialty_translation extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         specialty_translation.belongsTo(models.Specialty, {
            foreignKey: "specialtyId",
            targetKey: "id",
            as: "translationData",
         })
         // specialty_translation.belongsTo(models.Language, {
         //     foreignKey: 'languageId',
         //     targetKey: 'id',
         //     as: 'LanguageTranslationData',
         // })
      }
   }
   specialty_translation.init(
      {
         specialtyId: DataTypes.INTEGER,
         title: DataTypes.STRING,
         descriptionHTML: DataTypes.TEXT,
         descriptionMarkdown: DataTypes.TEXT,
         langCode: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "specialty_translation",
         freezeTableName: true,
      }
   )
   return specialty_translation
}
