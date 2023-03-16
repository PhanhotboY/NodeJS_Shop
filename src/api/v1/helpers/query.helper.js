const db = require(`../../../config/db/model.config`);
const { sequelize } = db;

const queryHelper = {
    async createNewRecord(modelName, data) {
        return await handle(
            'create',
            async () => {
                await sequelize.transaction(async (transaction) => {
                    return await db[capitalizeFirstLetter(modelName)].create(data, { transaction });
                });
            },
            modelName
        );
    },

    async getAllData(modelName, options) {
        return await handle(
            'get',
            async () => {
                const data = await db[capitalizeFirstLetter(modelName)].cache().findAll(options);

                return data || null;
            },
            modelName
        );
    },

    async getSingleData(modelName, options) {
        return await handle(
            'get',
            async () => {
                const data = await db[capitalizeFirstLetter(modelName)].cache().findOne(options);

                return data || null;
            },
            modelName
        );
    },

    async updateRecord(modelName, options, updateData) {
        return await handle(
            'update',
            async () => {
                const data = await sequelize.transaction(async (transaction) => {
                    const users = await this.getAllData(modelName, {
                        attributes: ['id'],
                        where: options.where,
                    });

                    if (!users.payload.length)
                        throw new Error({
                            message: 'Record dose not exist!',
                        });

                    return await db[capitalizeFirstLetter(modelName)].update(updateData, {
                        ...options,
                        transaction,
                    });
                });

                return data[1];
            },
            modelName
        );
    },

    async updateRecordAttribute(modelName, options, field, value) {
        return handle(
            'update',
            async () => {
                const data = await sequelize.transaction(async (transaction) => {
                    const data = this.getAllData(modelName, {
                        attributes: ['id'],
                        where: options.where,
                    });

                    if (!data.length)
                        throw new Error({
                            message: 'Record dose not exist!',
                        });

                    return await db[capitalizeFirstLetter(modelName)].update(
                        { [field]: value },
                        { ...options, transaction }
                    );
                });

                return data;
            },
            modelName
        );
    },

    async deleteRecord(modelName, deleteOptions) {
        return await handle(
            'restore',
            async () => {
                await sequelize.transaction(async (transaction) => {
                    await db[capitalizeFirstLetter(modelName)].destroy({
                        ...deleteOptions,
                        transaction,
                    });
                });
            },
            modelName
        );
    },

    async restoreRecord(modelName, options) {
        return await handle(
            'restore',
            async () => {
                await sequelize.transaction(async (transaction) => {
                    await db[capitalizeFirstLetter(modelName)].restore({
                        ...options,
                        transaction,
                    });
                });
            },
            modelName
        );
    },
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const handle = async (action, callback, modelName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = await callback();

            resolve({
                errType: null,
                message: `${capitalizeFirstLetter(
                    action
                )} ${modelName.toLowerCase()} successfully!`,
                payload,
            });
        } catch (err) {
            reject({
                errType: action,
                message: err.message,
            });
        }
    }).catch((err) => err);
};

export default queryHelper;
