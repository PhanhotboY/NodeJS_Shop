import { Op } from 'sequelize';
import db from '../models';

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

        if (!queryData.payload) {
            return {
                errType: 'email',
                message: 'User not exist. Please try again!',
            };
        }

        if (compareUserPassword(password, queryData.payload.password)) {
            delete queryData.payload.password;
            return {
                errType: null,
                message: 'Valid password. Welcome!',
                userInfo: queryData.payload,
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

        const response = await crudService.getAllData(modelName, queryOption);

        if (response.payload) {
            response.userInfo = response.payload;
            delete response.payload;
        }

        return response;
    },

    async getSingleUser(userId, isDeleted) {
        if (userId) {
            const queryOption = {
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
                },
                where: { id: userId },
                include: db.Notification,
                paranoid: !isDeleted,
            };

            const response = await crudService.getSingleData(modelName, queryOption);

            if (response.payload) {
                response.userInfo = response.payload;
                delete response.payload;
            }

            return response;
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

    async addKeyword(userId, keyword) {
        if (!userId) {
            return {
                errType: 'parameter',
                message: 'missing user id!',
            };
        }

        if (!keyword) {
            return {
                errType: null,
                message: 'No keywords were added!',
            };
        }

        keyword = decodeURIComponent((keyword + '').replace(/\+/g, '%20'));

        const userData = await this.getSingleUser(userId);

        if (userData.errType || !userData.userInfo) return userData;

        const queryOption = {
            attributes: {
                exclude: ['image', 'createdAt', 'updatedAt'],
            },
            where: { content: keyword },
        };

        const keywordData = await crudService.getSingleData('Keyword', queryOption);

        if (keywordData.errType) return keywordData;

        if (keywordData.payload) {
            crudService.updateSingleData(
                'Keyword',
                {
                    where: { content: keyword },
                },
                'searchPerDay',
                keywordData.payload.searchPerDay + 1
            );

            crudService.updateSingleData(
                'Keyword',
                {
                    where: { content: keyword },
                },
                'searchPerMonth',
                keywordData.payload.searchPerMonth + 1
            );
        } else {
            return {
                errType: null,
                message: 'wait a minutes',
            };
        }

        const field = 'recentlySearch';
        const updateValue = userData.userInfo[field];
        const options = { where: { userId }, limit: 1 };

        if (updateValue.indexOf(keyword) > -1)
            return {
                errType: null,
                message: 'No keywords were added!',
            };

        updateValue.push(keyword);

        return await crudService.updateSingleData(modelName, options, field, updateValue);
    },
};

export default userService;
