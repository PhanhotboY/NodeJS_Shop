'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Cart.init(
        {
            user_id: { type: DataTypes.INTEGER, primaryKey: true },
            products: DataTypes.JSONB,
            quantity: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Cart',
            tableName: 'carts',
            createdAt: false,
            updatedAt: false,
        }
    );
    return Cart;
};