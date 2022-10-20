'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Notification.init(
        {
            notificationId: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            thumbnail: DataTypes.STRING,
            title: DataTypes.STRING,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Notification',
            tableName: 'notifications',
            createdAt: false,
            updatedAt: false,
        }
    );
    return Notification;
};
