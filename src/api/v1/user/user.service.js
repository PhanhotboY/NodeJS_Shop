import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

import queryHelper from '../helpers/query.helper.js';
import { checkDataValidity, isUserExist } from './user.validation.js';

const exclude = ['password', 'createdAt', 'updatedAt', 'deletedAt'];

const userService = {
    async getAllUser(limit, isDeleted) {
        const options = {
            attributes: {
                exclude,
            },
            where: {
                deletedAt: {
                    [isDeleted ? Op.ne : Op.eq]: null,
                },
            },
            limit,
            paranoid: !isDeleted,
        };

        return await query('getAllData', options);
    },

    async getSingleUser(userId, isDeleted) {
        const options = {
            attributes: {
                exclude,
            },
            where: {
                id: userId,
                deletedAt: {
                    [isDeleted ? Op.ne : Op.eq]: null,
                },
            },
            paranoid: !isDeleted,
        };

        return await query('getSingleData', options);
    },

    async updateUser(userId, updateData) {
        const validateMessage = await checkDataValidity(updateData);

        if (validateMessage.errType) {
            return validateMessage;
        }

        if (!userId)
            return {
                errType: 'parameter',
                message: 'Missing required parameter!',
            };

        const options = {
            where: { id: userId },
            returning: true,
            plain: true,
            limit: 1,
        };
        const newData = {
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            gender: updateData.gender,
            phoneNumber: updateData.phoneNumber,
            avatar: updateData.avatar,
            address: updateData.address,
            roleId: updateData.roleId,
        };

        const res = await query('updateRecord', options, newData);

        if (res.userInfo) {
            ['password', 'deletedAt', 'createdAt', 'updatedAt'].forEach(
                (e) => delete res.userInfo[e]
            );
        }

        return res;
    },

    async deleteUser(userId, isPermanently) {
        let options = {
            attributes: ['email'],
            where: {
                id: userId,
                deletedAt: {
                    [isPermanently ? Op.ne : Op.eq]: null,
                },
            },
            paranoid: !isPermanently,
        };

        const queryData = await query('getSingleData', options);

        if (!queryData.userInfo) {
            return {
                errType: 'user',
                message: 'User does not exist. Please try again!',
            };
        }

        options = {
            where: { id: userId },
            limit: 1,
            force: isPermanently,
        };

        return await query('deleteRecord', options);
    },

    async restoreUser(userId) {
        if (!(await isUserExist({ userId, paranoid: false }))) {
            return {
                errType: 'user',
                message: 'User does not exist. Please try again!',
            };
        }

        const options = { where: { id: userId }, limit: 1 };

        return await query('restoreRecord', options);
    },
};

const salt = bcrypt.genSaltSync(10);

export const hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hashSync(password, salt);

            resolve(hashedPassword);
        } catch (err) {
            reject(err.message);
        }
    }).catch((err) => err);
};

const query = async (action, options, data) => {
    const res = await queryHelper[action]('User', options, data);

    res.userInfo = res.payload;
    delete res.payload;

    return res;
};

export default userService;
