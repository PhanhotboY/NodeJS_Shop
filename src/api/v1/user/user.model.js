'use strict';

import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            const allowNullOption = { foreignKey: { allowNull: false } };

            // User.hasMany(models.Receipt, allowNullOption);
            Users.hasMany(models.Product, allowNullOption);
            // User.belongsToMany(models.Product, { through: models.Cart });
            // User.belongsToMany(models.Product, { through: models.Review });
            Users.belongsToMany(models.Notification, {
                through: 'Receive',
                as: 'Notification',
            });
            Users.belongsToMany(Users, {
                as: 'Follower',
                through: 'Follow',
                foreignKey: 'FollowerId',
            });
            Users.belongsToMany(Users, {
                as: 'Following',
                through: 'Follow',
                foreignKey: 'FollowingId',
            });
        }
    }

    Users.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.STRING,
                allowNull: false,
            },
            stripeId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            gender: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            avatar: DataTypes.STRING,
            address: DataTypes.STRING,
            roleId: DataTypes.STRING,
            shopType: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Users',
            tableName: 'Users',
            timestamps: true,
            paranoid: true,
        }
    );
    return Users;
};
