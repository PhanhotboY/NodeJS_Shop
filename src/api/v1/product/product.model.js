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
            const allowNullOption = { foreignKey: { allowNull: false } };

            Product.belongsTo(models.User, allowNullOption);
            Product.belongsTo(models.User, allowNullOption);
            // Product.belongsToMany(models.Receipt, { through: models.Order });
            // Product.belongsToMany(models.User, { through: models.Cart, ...allowNullOption });
            // Product.belongsToMany(models.User, { through: models.Review, ...allowNullOption });
            // Product.belongsToMany(models.Flashsale, { through: models.Join, ...allowNullOption });
        }
    }

    Product.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            discount: DataTypes.STRING,
            originPrice: DataTypes.INTEGER,
            totalRemainder: DataTypes.INTEGER,
            totalSold: DataTypes.INTEGER,
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
