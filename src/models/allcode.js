'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Allcode.init(
        {
            id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
            type: DataTypes.STRING,
            value_vi: DataTypes.STRING,
            value_en: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Allcode',
            tableName: 'allcodes',
            createdAt: false,
            updatedAt: false,
        }
    );
    return Allcode;
};
