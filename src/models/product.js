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
            product_id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            title: DataTypes.STRING,
            discount: DataTypes.STRING,
            origin_price: DataTypes.STRING,
            flashsale_discount: DataTypes.STRING,
            total_remainder: DataTypes.STRING,
            total_sold: DataTypes.STRING,
            total_review: DataTypes.STRING,
            rating: DataTypes.STRING,
            description: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
            flag_id: DataTypes.STRING,
            overlay_id: DataTypes.STRING,
            brand_id: DataTypes.STRING,
            flashsale_id: DataTypes.INTEGER,
            image: DataTypes.ARRAY(DataTypes.STRING),
            deals: DataTypes.ARRAY(DataTypes.STRING),
            categories: DataTypes.ARRAY(DataTypes.STRING),
            relate_keyword: DataTypes.ARRAY(DataTypes.STRING),
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
