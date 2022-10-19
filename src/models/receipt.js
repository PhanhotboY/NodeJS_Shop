'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Receipt extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Receipt.init(
        {
            orderId: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            userId: DataTypes.INTEGER,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Receipt',
            tableName: 'receipts',
            timestamps: true,
        }
    );
    return Receipt;
};
