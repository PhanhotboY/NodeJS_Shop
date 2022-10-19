'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Join extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Join.init(
        {
            flashsaleId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
            maxQuantity: DataTypes.STRING,
            discount: DataTypes.STRING,
            sold: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Join',
            tableName: 'joins',
            timestamps: true,
        }
    );
    return Join;
};
