import db, { sequelize } from '../../../config/db/model.config';

const queryHelper = {
    async createNewRecord(modelName, data) {
        return new Promise(async (resolve, reject) => {
            try {
                sequelize.transaction(async (transaction) => {
                    return await db[capitalizeFirstLetter(modelName)].create(data, { transaction });
                });

                resolve({
                    errType: null,
                    message: `Create ${modelName.toLowerCase()} successfully!'`,
                });
            } catch (err) {
                reject({
                    errType: 'create',
                    message: err.message,
                });
            }
        }).catch((err) => err);
    },

    async getAllData(modelName, options) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db[capitalizeFirstLetter(modelName)].findAll(options);

                resolve({
                    errType: null,
                    message: 'All OK!',
                    payload: data,
                });
            } catch (err) {
                reject({
                    errType: 'query',
                    message: err.message,
                });
            }
        }).catch((err) => err);
    },

    async getSingleData(modelName, options) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db[capitalizeFirstLetter(modelName)].findOne(options);

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

    async updateRecord(modelName, updateData, options) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await sequelize.transaction(async (transaction) => {
                    const users = await this.getAllData(modelName, {
                        attributes: ['id'],
                        where: options.where,
                    });

                    if (!users.payload.length)
                        resolve({
                            errType: 'update',
                            message: 'Record dose not exist!',
                        });

                    return await db[capitalizeFirstLetter(modelName)].update(updateData, {
                        ...options,
                        transaction,
                    });
                });

                resolve({
                    errType: null,
                    message: `Update ${modelName.toLowerCase()} successfully!`,
                    payload: data[1],
                });
            } catch (err) {
                reject({
                    errType: 'update',
                    message: err.message,
                });
            }
        }).catch((err) => err);
    },

    async updateRecordAttribute(modelName, options, field, value) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await sequelize.transaction(async (transaction) => {
                    const data = this.getAllData(modelName, {
                        attributes: ['id'],
                        where: options.where,
                    });

                    if (!data.length)
                        resolve({
                            errType: 'update',
                            message: 'Record dose not exist!',
                        });

                    return await db[capitalizeFirstLetter(modelName)].update(
                        { [field]: value },
                        { ...options, transaction }
                    );
                });

                resolve({
                    errType: null,
                    message: `Updata ${field} of ${modelName.toLowerCase()} successfully!`,
                    payload: data,
                });
            } catch (err) {
                reject({
                    errType: 'update',
                    message: err.message,
                });
            }
        }).catch((err) => err);
    },

    async deleteRecord(modelName, deleteOptions) {
        return new Promise(async (resolve, reject) => {
            try {
                await sequelize.transaction(async (transaction) => {
                    await db[capitalizeFirstLetter(modelName)].destroy({
                        ...deleteOptions,
                        transaction,
                    });
                });

                resolve({
                    errType: null,
                    message: `Delete ${modelName.toLowerCase()} successfully!`,
                });
            } catch (err) {
                reject({
                    errType: 'delete',
                    message: err.message,
                });
            }
        }).catch((err) => err);
    },

    async restoreRecord(modelName, options) {
        return new Promise(async (resolve, reject) => {
            try {
                await sequelize.transaction(async (transaction) => {
                    await db[capitalizeFirstLetter(modelName)].restore({
                        ...options,
                        transaction,
                    });
                });

                resolve({
                    errType: null,
                    message: `Restore ${modelName.toLowerCase()} successfully!`,
                });
            } catch (err) {
                reject({
                    errType: 'restore',
                    message: err.message,
                });
            }
        }).catch((err) => err);
    },
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default queryHelper;
