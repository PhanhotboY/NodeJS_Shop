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
            order_id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            user_id: DataTypes.INTEGER,
            products: DataTypes.JSONB,
            status_id: DataTypes.STRING,
            order_time: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Order',
            tableName: 'orders',
            timestamps: true,
        }
    );
    return Order;
};
