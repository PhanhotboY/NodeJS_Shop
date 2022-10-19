'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Keyword extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Keyword.init(
        {
            content: {
                primaryKey: true,
                type: DataTypes.STRING,
            },
            image: DataTypes.STRING,
            searchPerDay: DataTypes.INTEGER,
            searchPerMonth: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Keyword',
            tableName: 'keywords',
            timestamps: true,
        }
    );
    return Keyword;
};
