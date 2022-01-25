'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class specialtyTranslation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            specialtyTranslation.belongsTo(models.Specialty, {
                foreignKey: 'specialtyId',
                targetKey: 'id',
                as: 'specialtyTranslationData',
            })
            // specialtyTranslation.belongsTo(models.Language, {
            //     foreignKey: 'languageId',
            //     targetKey: 'id',
            //     as: 'LanguageTranslationData',
            // })
        }
    }
    specialtyTranslation.init(
        {
            specialtyId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            descriptionHTML: DataTypes.STRING,
            descriptionMarkdown: DataTypes.STRING,
            langCode: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'specialtyTranslation',
            freezeTableName: true,
        }
    )
    return specialtyTranslation
}
