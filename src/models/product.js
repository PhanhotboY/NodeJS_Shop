'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Product.init(
        {
            productId: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            discount: DataTypes.STRING,
            originPrice: DataTypes.STRING,
            totalRemainder: DataTypes.STRING,
            totalSold: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            brandId: DataTypes.INTEGER,
            overlay: DataTypes.STRING,
            image: DataTypes.ARRAY(DataTypes.STRING),
            deals: DataTypes.ARRAY(DataTypes.STRING),
            category: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Product',
            tableName: 'products',
            timestamps: true,
        }
    );
    return Product;
};
