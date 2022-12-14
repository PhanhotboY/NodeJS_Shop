'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Voucher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Voucher.init(
        {
            code: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
            type: DataTypes.STRING,
            category: DataTypes.STRING,
            percent: DataTypes.STRING,
            maxDiscount: DataTypes.STRING,
            minOrder: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
            quantityUsed: DataTypes.INTEGER,
            startTime: DataTypes.DATE,
            expire: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Voucher',
            tableName: 'vouchers',
        }
    );
    return Voucher;
};
