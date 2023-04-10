const db = require.main.require('./config/db/model.config');

const queryHelper = {
    async createNewRecord(modelName, data) {
        try {
            const result = await db[capitalizeFirstLetter(modelName)].create(data);

            return {
                errType: null,
                message: `Create ${modelName.toLowerCase()} successfully!`,
                payload: result.dataValues,
            };
        } catch (err) {
            return {
                errType: 'create',
                message: err.message,
            };
        }
    },

    async getAllData(modelName, options) {
        try {
            const data = await db[capitalizeFirstLetter(modelName)].findAll(options);

            return {
                errType: null,
                message: `Get ${modelName.toLowerCase()} successfully!`,
                payload: data || null,
            };
        } catch (err) {
            return {
                errType: 'get',
                message: err.message,
            };
        }
    },

    async getSingleData(modelName, options) {
        try {
            const data = await db[capitalizeFirstLetter(modelName)].cache().findOne(options);

            return {
                errType: null,
                message: `Get ${modelName.toLowerCase()} successfully!`,
                payload: data || null,
            };
        } catch (err) {
            return {
                errType: 'get',
                message: err.message,
            };
        }
    },

    async updateRecord(modelName, options, updateData) {
        try {
            const [rowsUpdated] = await db[capitalizeFirstLetter(modelName)].update(
                updateData,
                options
            );

            if (rowsUpdated === 0) {
                throw new Error('Record does not exist!');
            }

            const getResponse = await this.getSingleData(modelName, options);

            return {
                errType: null,
                message: `Update ${modelName.toLowerCase()} successfully!`,
                payload: getResponse.payload,
            };
        } catch (err) {
            return {
                errType: 'update',
                message: err.message,
            };
        }
    },

    async updateRecordAttribute(modelName, options, field, value) {
        try {
            const [rowsUpdated] = await db[capitalizeFirstLetter(modelName)].update(
                { [field]: value },
                { where: options.where }
            );

            if (rowsUpdated === 0) {
                throw new Error('Record does not exist!');
            }

            return {
                errType: null,
                message: `Update ${modelName.toLowerCase()} successfully!`,
                payload: rowsUpdated,
            };
        } catch (err) {
            return {
                errType: 'update',
                message: err.message,
            };
        }
    },

    async deleteRecord(modelName, deleteOptions) {
        try {
            const rowsDeleted = await db[capitalizeFirstLetter(modelName)].destroy(deleteOptions);

            return {
                errType: null,
                message: `Delete ${modelName.toLowerCase()} successfully!`,
                payload: rowsDeleted,
            };
        } catch (err) {
            return {
                errType: 'delete',
                message: err.message,
            };
        }
    },

    async restoreRecord(modelName, options) {
        try {
            const rowsRestored = await db[capitalizeFirstLetter(modelName)].restore(options);

            return {
                errType: null,
                message: `Restore ${modelName.toLowerCase()} successfully!`,
                payload: rowsRestored,
            };
        } catch (err) {
            return {
                errType: 'restore',
                message: err.message,
            };
        }
    },
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = queryHelper;
