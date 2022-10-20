'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Banner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Banner.init(
        {
            bannerId: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            bannerType: DataTypes.STRING,
            promoType: DataTypes.STRING,
            image: DataTypes.STRING,
            ordinal: DataTypes.SMALLINT,
            position: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Banner',
            tableName: 'banners',
            timestamps: true,
        }
    );
    return Banner;
};
