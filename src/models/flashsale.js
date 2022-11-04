'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Flashsale extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Flashsale.belongsToMany(models.Product, { through: models.Join });
        }
    }

    Flashsale.init(
        {
            startTime: DataTypes.DATE,
            endTime: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Flashsale',
            tableName: 'flashsales',
            timestamps: true,
        }
    );
    return Flashsale;
};
