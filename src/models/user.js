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
            user_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            gender: DataTypes.BOOLEAN,
            phone_number: DataTypes.STRING,
            avatar: DataTypes.STRING,
            address: DataTypes.STRING,
            role_id: DataTypes.STRING,
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
