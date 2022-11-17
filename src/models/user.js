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
            const allowNullOption = { foreignKey: { allowNull: false } };

            User.hasMany(models.Receipt, allowNullOption);
            User.hasMany(models.Product, allowNullOption);
            User.belongsToMany(models.Product, { through: models.Cart });
            User.belongsToMany(models.Product, { through: models.Review });
            User.belongsToMany(models.Notification, {
                through: 'Receive',
                // as: 'Notification',
            });
            User.belongsToMany(User, {
                as: 'Follower',
                through: 'Follow',
                foreignKey: 'FollowerId',
            });
            User.belongsToMany(User, {
                as: 'Following',
                through: 'Follow',
                foreignKey: 'FollowingId',
            });
        }
    }

    User.init(
        {
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
            modelName: 'User',
            tableName: 'Users',
            timestamps: true,
            paranoid: true,
        }
    );
    return User;
};
