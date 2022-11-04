'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Review.init(
        {
            rating: DataTypes.SMALLINT,
            comment: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Review',
            tableName: 'reviews',
        }
    );
    return Review;
};
