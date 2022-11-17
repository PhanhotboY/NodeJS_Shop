import bcrypt from 'bcryptjs';
import { NOW, Op } from 'sequelize';

import db from '../models';
import crudService from './CRUDService';

const modelName = 'User';

const userService = {
    async handleUserLogin({ email = '', password = '' }) {
        const queryOption = {
            attributes: ['email', 'password', 'firstName', 'lastName', 'avatar', 'roleId'],
            where: { email },
        };

        const queryData = await crudService.getSingleData(modelName, queryOption);

        if (!queryData.payload) {
            return {
                errType: 'email',
                message: 'User not exist. Please try again!',
            };
        }

        if (await compareUserPassword(password, queryData.payload.password)) {
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
        const validateMessage = await checkValidityData(data);

        if (validateMessage.errType) {
            return validateMessage;
        }

        if (await checkUserExist({ email: data.email })) {
            return {
                errType: 'email',
                message: 'Email already exist. Please try another email!',
            };
        }

        const hashedPassword = await hashUserPassword(data.password);

        data = { ...data, password: hashedPassword };

        return await crudService.createNewRecord(modelName, data);
    },

    async getAllUser(limit, isDeleted) {
        const queryOption = {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
            },
            where: {
                deletedAt: {
                    [isDeleted ? Op.ne : Op.eq]: null,
                },
            },
            limit: Number(limit) || 30,
            paranoid: !isDeleted,
        };

        const response = await crudService.getAllData(modelName, queryOption);

        response.userInfo = response.payload;
        delete response.payload;

        return response;
    },

    async getSingleUser(userId, isDeleted) {
        const queryOption = {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
            },
            where: {
                id: userId,
                deletedAt: {
                    [isDeleted ? Op.ne : Op.eq]: null,
                },
            },
            raw: false,
            include: db.Notification,
            paranoid: !isDeleted,
        };

        const response = await crudService.getSingleData(modelName, queryOption);

        response.userInfo = response.payload;
        delete response.payload;

        return response;
    },

    async updateUser(updateData) {
        const validateMessage = await checkValidityData(updateData);

        if (validateMessage.errType) {
            return validateMessage;
        }

        return await crudService.updateRecord(modelName, updateData, options);
    },

    async deleteUser(userId, isPermanently) {
        const queryOption = {
            attributes: ['email'],
            where: {
                id: userId,
                deletedAt: {
                    [isPermanently ? Op.ne : Op.eq]: null,
                },
            },
            paranoid: !isPermanently,
        };

        const queryData = await crudService.getSingleData(modelName, queryOption);

        if (!queryData.payload) {
            return {
                errType: 'user',
                message: 'User does not exist. Please try again!',
            };
        }

        const deleteOption = {
            where: { id: userId },
            limit: 1,
            force: isPermanently,
        };

        return await crudService.deleteRecord(modelName, deleteOption);
    },

    async restoreUser(userId) {
        if (!(await checkUserExist({ userId, paranoid: false }))) {
            return {
                errType: 'user',
                message: 'User does not exist. Please try again!',
            };
        }

        const options = { where: { id: userId } };
        const updateData = {
            deletedAt: null,
        };

        return await crudService.restoreRecord(modelName, updateData, options);
    },
};

const salt = bcrypt.genSaltSync(10);

const regexCheckPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const regexCheckEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
const regexCheckURL =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const regexCheckPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hashSync(password, salt);

            resolve(hashedPassword);
        } catch (err) {
            reject(err.message);
        }
    }).catch((err) => err);
};

const compareUserPassword = async (inputPassword, userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isSamePassword = await bcrypt.compareSync(inputPassword, userPassword);

            resolve(isSamePassword);
        } catch (err) {
            reject(err.message);
        }
    }).catch((err) => err);
};

export const checkUserExist = async ({ email, userId, paranoid = true }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await crudService.getAllData(modelName, {
                attributes: ['id'],
                where: { [email ? 'email' : 'id']: email || userId },
                paranoid,
            });

            if (users.payload.length) {
                resolve(true);
            }
            resolve(false);
        } catch (err) {
            reject(err.message);
        }
    }).catch((err) => err);
};

export const checkValidityData = ({ email, password, phoneNumber, avatarURL }) => {
    const checkingRes = {
        errType: null,
        message: 'Ok',
    };

    if (email && !email.match(regexCheckEmail)) {
        checkingRes.errType = 'email';
        checkingRes.message = `Invalid email. Try again!`;
        return checkingRes;
    }

    if (password && !password.match(regexCheckPassword)) {
        checkingRes.errType = 'password';
        checkingRes.message = `Invalid password. Try again!`;
        return checkingRes;
    }

    if (phoneNumber && !phoneNumber.match(regexCheckPhoneNumber)) {
        checkingRes.errType = 'phoneNumber';
        checkingRes.message = `Invalid phone number. Try again!`;
        return checkingRes;
    }

    if (avatarURL && !avatarURL.match(regexCheckURL)) {
        checkingRes.errType = 'avatar';
        checkingRes.message = `Invalid URL. Try again!`;
        return checkingRes;
    }

    return checkingRes;
};

export default userService;
