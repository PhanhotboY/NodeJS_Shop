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
            key: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
            type: DataTypes.STRING,
            image: DataTypes.STRING,
            valueVi: DataTypes.STRING,
            valueEn: DataTypes.STRING,
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
