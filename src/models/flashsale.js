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
        }
    }

    Flashsale.init(
        {
            flashsale_id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            duration: DataTypes.STRING,
            date: DataTypes.DATE,
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
