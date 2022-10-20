'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Order.init(
        {
            orderId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Order',
            tableName: 'orders',
            createdAt: false,
            updatedAt: false,
        }
    );
    return Order;
};
