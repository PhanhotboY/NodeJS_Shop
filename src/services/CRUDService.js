import { Op } from 'sequelize';

import db, { sequelize } from '../models';
import bcrypt from 'bcryptjs';
// import { Sequelize as sequelize } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const regexCheckPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const regexCheckEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
const regexCheckURL =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const regexCheckPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const crudService = {
    async createNewUser(data) {
        const validateMessage = await checkValidityData(data);

        if (validateMessage.errType) {
            return validateMessage;
        }

        return new Promise(async (resolve, reject) => {
            try {
                const hashedPassword = await hashUserPassword(data.password);

                sequelize.transaction(async (trans) => {
                    await db.User.create(
                        {
                            email: data.email,
                            password: hashedPassword,
                            first_name: data.firstName,
                            last_name: data.lastName,
                            gender: data.gender === '1' ? true : false,
                            phone_number: data.phoneNumber,
                            avatar: data.avatarURL,
                            address: data.address,
                            role_id: data.role,
                        },
                        { transaction: trans }
                    );
                });

                resolve({
                    errType: null,
                    message: 'create user successfully!',
                });
            } catch (err) {
                reject(err);
            }
        });
    },

    async getUser(dataType, id) {
        let data = {};

        if (id) {
            if (id === 'all') {
                try {
                    data = await db[capitalizeFirstLetter(dataType)].findAll({
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt'],
                        },
                    });
                } catch (err) {
                    return {
                        errType: 'query',
                        message: 'Something wrong!',
                        errInfo: err,
                    };
                }
            } else {
                try {
                    data = await db[capitalizeFirstLetter(dataType)].findOne({
                        where: { [`${dataType}_id`]: id },
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt'],
                        },
                    });
                } catch (err) {
                    return {
                        errType: 'query',
                        message: 'Something wrong!',
                        errInfo: err,
                    };
                }
            }
            return {
                errType: null,
                message: 'all OK!',
                userInfo: data,
            };
        }

        return {
            errType: 'parameter',
            message: 'missing parameter!',
        };
    },

    async getDeletedUser(dataType) {
        let data = {};

        try {
            data = await db[capitalizeFirstLetter(dataType)].findAndCountAll({
                attributes: {
                    exclude: [
                        'password',
                        'createdAt',
                        'updatedAt',
                        'deletedAt',
                    ],
                },
                where: {
                    deletedAt: {
                        [Op.ne]: null,
                    },
                },
                paranoid: false,
            });
        } catch (err) {
            return {
                errType: 'query',
                message: 'Something wrong!',
                errInfo: err,
            };
        }
        return {
            errType: null,
            message: 'all OK!',
            userInfo: data,
        };
    },

    async updateUser(updateData) {
        const validateMessage = await checkValidityData(updateData);

        if (validateMessage.errType) {
            return validateMessage;
        }

        if (updateData.user_id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const hashedPassword = await (updateData.password === ''
                        ? ''
                        : hashUserPassword(updateData.password));

                    sequelize.transaction(async (trans) => {
                        await db.User.update(
                            {
                                email: updateData.email,
                                [updateData.password === '' ? '' : 'password']:
                                    hashedPassword,
                                first_name: updateData.first_name,
                                last_name: updateData.last_name,
                                gender:
                                    updateData.gender === '1' ? true : false,
                                phone_number: updateData.phone_number,
                                avatar: updateData.avatar,
                                address: updateData.address,
                                role_id: updateData.role_id,
                            },
                            {
                                where: { user_id: updateData.user_id },
                                transaction: trans,
                            }
                        );
                    });

                    resolve({
                        errType: null,
                        message: 'Update user successfully!',
                    });
                } catch (err) {
                    reject({
                        errType: 'update',
                        message: 'Something wrong!',
                        errInfo: err,
                    });
                }
            });
        }

        return {
            errType: 'parameter',
            message: 'missing parameter!',
        };
    },

    async deleteUser(userId) {
        if (userId) {
            return new Promise(async (resolve, reject) => {
                try {
                    sequelize.transaction(async (trans) => {
                        await db.User.destroy({
                            where: { user_id: userId },
                            transaction: trans,
                            limit: 1,
                        });
                    });

                    resolve({
                        errType: null,
                        message: 'delete user successfully!',
                    });
                } catch (err) {
                    reject({
                        errType: 'update',
                        message: 'Something wrong!',
                        errInfo: err,
                    });
                }
            });
        }
        return {
            errType: 'parameter',
            message: 'missing parameter!',
        };
    },

    async compareUserPassword(data) {
        const userData = await sequelize.transaction(async (trans) => {
            return await db.User.findOne(
                {
                    attributes: ['email', 'role_id', 'password'],
                    where: { email: data.email },
                },
                { transaction: trans }
            );
        });
        if (bcrypt.compareSync(data.password, userData.password)) {
            delete userData.password;
            return {
                errType: null,
                message: 'Valid password. Welcome!',
                userInfo: userData,
            };
        }
        return {
            errType: 'password',
            message: 'wrong password. Please try again!',
        };
    },
};

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hashSync(password, salt);

            resolve(hashedPassword);
        } catch (err) {
            reject(err);
        }
    });
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findAll({
                attributes: ['user_id'],
                where: { email },
            });
            if (user.length) {
                resolve(true);
            }
            resolve(false);
        } catch (err) {
            reject(err);
        }
    });
};

const checkValidityData = ({ email, password, phoneNumber, avatarURL }) => {
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

export default crudService;
