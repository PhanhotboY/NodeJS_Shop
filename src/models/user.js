'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init(
        {
            userId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            gender: DataTypes.BOOLEAN,
            phoneNumber: DataTypes.STRING,
            avatar: DataTypes.STRING,
            address: DataTypes.STRING,
            recentlySearch: DataTypes.ARRAY(DataTypes.STRING),
            roleId: DataTypes.STRING,
            shopType: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            timestamps: true,
            paranoid: true,
        }
    );
    return User;
};
