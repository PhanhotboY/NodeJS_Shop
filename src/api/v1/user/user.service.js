const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const queryHelper = require('../helpers/query.helper.js');
const { listCustomerPayMethods } = require('../helpers/payment.helper');
const { checkDataValidity, isUserExist } = require('./user.validation.js');

const exclude = ['password', 'stripeId', 'createdAt', 'updatedAt', 'deletedAt'];

const userService = {
    async getAllUser(limit, isDeleted) {
        const options = {
            attributes: { exclude },
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
            attributes: { exclude, include: ['stripeId'] },
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
            exclude,
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

    async getAllUserInfo(userId) {
        const options = {
            where: {
                id: userId,
            },
        };

        const res = await queryHelper.getSingleData('Users', options);

        res.userInfo = res.payload;
        delete res.payload;

        return res;
    },
};

export const hashUserPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);

    try {
        const hashedPassword = await bcrypt.hashSync(password, salt);

        return hashedPassword;
    } catch (err) {
        return err.message;
    }
};

const query = async (action, options, data) => {
    const res = await queryHelper[action]('Users', options, data);

    res.userInfo = res.payload;
    delete res.payload;

    if (res.userInfo?.stripeId) {
        try {
            const paymentMethods = await listCustomerPayMethods(res.userInfo.stripeId);
            res.userInfo.isAttachedPaymentMethod = !!paymentMethods.length;

            delete res.userInfo.stripeId;
        } catch (err) {
            return {
                errType: 'stripe',
                message: err.message,
            };
        }
    }

    return res;
};

module.exports = userService;
