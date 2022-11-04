import db, { sequelize } from '../models';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const regexCheckPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const regexCheckEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
const regexCheckURL =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const regexCheckPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const crudService = {
    async createNewUser(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashedPassword = await hashUserPassword(data.password);

                sequelize.transaction(async (trans) => {
                    await db.User.create(
                        {
                            email: data.email,
                            password: hashedPassword,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            gender: data.gender === '1' ? true : false,
                            phoneNumber: data.phoneNumber,
                            avatar: data.avatarURL,
                            address: data.address,
                            roleId: data.roleId,
                        },
                        { transaction: trans }
                    );
                });

                resolve({
                    errType: null,
                    message: 'create user successfully!',
                });
            } catch (err) {
                reject(err.message);
            }
        }).catch((err) => err);
    },

    async getAllData(modelName, queryOptions) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db[modelName].findAll(queryOptions);

                resolve({
                    errType: null,
                    message: 'all OK!',
                    payload: data,
                });
            } catch (err) {
                reject({
                    errType: 'query',
                    message: 'Something wrong!',
                    errInfo: err.message,
                });
            }
        }).catch((err) => err);
    },

    async getSingleData(modelName, queryOptions) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db[modelName].findOne(queryOptions);

                resolve({
                    errType: null,
                    message: 'all OK!',
                    payload: data,
                });
            } catch (err) {
                reject({
                    errType: 'query',
                    message: 'Something wrong!',
                    errInfo: err.message,
                });
            }
        }).catch((err) => err);
    },

    async updateUser(updateData) {
        if (updateData.userId) {
            return new Promise(async (resolve, reject) => {
                try {
                    const hashedPassword = await (updateData.password === ''
                        ? ''
                        : hashUserPassword(updateData.password));

                    const userInfo = await sequelize.transaction(async (trans) => {
                        return await db.User.update(
                            {
                                [updateData.password === '' ? '' : 'password']: hashedPassword,
                                firstName: updateData.firstName,
                                lastName: updateData.lastName,
                                gender: updateData.gender === '1' ? true : false,
                                phoneNumber: updateData.phoneNumber,
                                avatar: updateData.avatar,
                                address: updateData.address,
                                roleId: updateData.roleId,
                            },
                            {
                                where: { userId: updateData.userId },
                                returning: true,
                                transaction: trans,
                            }
                        );
                    });

                    resolve({
                        errType: null,
                        message: 'Update user successfully!',
                        userInfo: {
                            email: userInfo[1][0].email,
                            roleId: userInfo[1][0].roleId,
                            avatar: userInfo[1][0].avatar,
                        },
                    });
                } catch (err) {
                    reject({
                        errType: 'update',
                        message: 'Something wrong!',
                        errInfo: err.message,
                    });
                }
            }).catch((err) => err);
        }

        return {
            errType: 'parameter',
            message: 'missing parameter!',
        };
    },

    async updateSingleData(modelName, options, field, value) {
        try {
            await db[modelName].update({ [field]: value }, options);

            return {
                errType: null,
                message: `Add ${field} successfully!`,
            };
        } catch (err) {
            return {
                errType: 'update',
                message: `Can't add ${field}!`,
                errInfo: err.message,
            };
        }
    },

    async deleteData(modelName, deleteOptions) {
        return new Promise(async (resolve, reject) => {
            try {
                sequelize.transaction(async (trans) => {
                    await db[modelName].destroy({
                        ...deleteOptions,
                        transaction: trans,
                    });
                });

                resolve({
                    errType: null,
                    message: `delete ${modelName.toLowerCase()} successfully!`,
                });
            } catch (err) {
                reject({
                    errType: 'delete',
                    message: 'Something wrong!',
                    errInfo: err.message,
                });
            }
        }).catch((err) => err);
    },

    async restoreData(modelName, options) {
        return new Promise(async (resolve, reject) => {
            try {
                sequelize.transaction(async (trans) => {
                    await db[modelName].restore({
                        ...options,
                        transaction: trans,
                    });
                });

                resolve({
                    errType: null,
                    message: `restore ${modelName.toLowerCase()} successfully!`,
                });
            } catch (err) {
                reject({
                    errType: 'restore',
                    message: 'Something wrong!',
                    errInfo: err.message,
                });
            }
        }).catch((err) => err);
    },
};

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

export const compareUserPassword = (inputPassword, userPassword) => {
    return bcrypt.compareSync(inputPassword, userPassword);
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const checkUserExist = async ({ email, userId, paranoid = true }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findAll({
                attributes: ['id'],
                where: { [email ? 'email' : 'id']: email || userId },
                paranoid,
            });

            if (user.length) {
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

export default crudService;
