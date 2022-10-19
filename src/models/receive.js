'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Receive extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Receive.init(
        {
            userId: DataTypes.INTEGER,
            notificationId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Receive',
            tableName: 'receives',
        }
    );
    return Receive;
};
