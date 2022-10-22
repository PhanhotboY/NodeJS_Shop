import { Op } from 'sequelize';

import crudService, { checkValidityData, compareUserPassword, checkUserExist } from './CRUDService';

const modelName = 'User';

const userService = {
    async handleUserLogin({ email = '', password = '' }) {
        if (!(await checkUserExist({ email }))) {
            return {
                errType: 'email',
                message: 'User is not exist. Please try again!',
            };
        }

        const queryOption = {
            attributes: ['email', 'roleId', 'password', 'avatar'],
            where: { email },
        };

        const queryData = await crudService.getSingleData(modelName, queryOption);

        if (!queryData.userInfo) {
            return {
                errType: 'email',
                message: 'User not exist. Please try again!',
            };
        }

        const { userInfo } = queryData;

        if (compareUserPassword(password, userInfo.password)) {
            delete userInfo.password;
            return {
                errType: null,
                message: 'Valid password. Welcome!',
                userInfo,
            };
        }
        return {
            errType: 'password',
            message: 'wrong password. Please try again!',
        };
    },

    async handleUserSignup(data) {
        const validateMessage = await checkValidityData({ email: data.email });

        if (validateMessage.errType) {
            return validateMessage;
        }

        if (await checkUserExist({ email: data.email })) {
            return {
                errType: 'email',
                message: 'Email already exist. Please try another email!',
            };
        }

        return await crudService.createNewUser(data);
    },

    async getAllUser(limit, isDeleted) {
        const queryOption = {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
            },
            where: isDeleted
                ? {
                      deletedAt: {
                          [Op.ne]: null,
                      },
                  }
                : {},
            limit: Number(limit) || 30,
            paranoid: !isDeleted,
        };

        return await crudService.getAllData(modelName, queryOption);
    },

    async getSingleUser(userId, isDeleted) {
        if (userId) {
            const queryOption = {
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
                },
                where: { userId },
                paranoid: !isDeleted,
            };

            return await crudService.getSingleData(modelName, queryOption);
        }

        return {
            errType: 'parameter',
            message: 'missing user id!',
        };
    },

    async updateUser(updateData) {
        const validateMessage = await checkValidityData(updateData);

        if (validateMessage.errType) {
            return validateMessage;
        }

        return await crudService.updateUser(updateData);
    },

    async deleteUser(userId, isPermanently) {
        if (userId) {
            const queryOption = {
                attributes: ['email'],
                where: {
                    userId,
                    deletedAt: {
                        [isPermanently ? Op.ne : Op.eq]: null,
                    },
                },
                paranoid: !isPermanently,
            };

            const queryData = await crudService.getSingleData(modelName, queryOption);

            if (!queryData.userInfo) {
                return {
                    errType: 'user',
                    message: 'User does not exist. Please try again!',
                };
            }

            const deleteOption = {
                where: { userId },
                limit: 1,
                force: isPermanently,
            };

            return await crudService.deleteData(modelName, deleteOption);
        }

        return {
            errType: 'parameter',
            message: 'missing user id!',
        };
    },

    async restoreUser(userId) {
        if (!(await checkUserExist({ userId, paranoid: false }))) {
            return {
                errType: 'user',
                message: 'User does not exist. Please try again!',
            };
        }

        if (userId) {
            const options = { where: { userId } };

            return await crudService.restoreData(modelName, options);
        }

        return {
            errType: 'parameter',
            message: 'missing user id!',
        };
    },
};

export default userService;
