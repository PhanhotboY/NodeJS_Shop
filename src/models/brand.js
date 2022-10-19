'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Brand.init(
        {
            brandId: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            userId: DataTypes.INTEGER,
            logo: DataTypes.STRING,
            promoTextVi: DataTypes.STRING,
            promoTextEn: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Brand',
            tableName: 'brands',
            timestamps: true,
        }
    );
    return Brand;
};
