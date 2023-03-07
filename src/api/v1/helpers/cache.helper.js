import { Model } from 'sequelize';

import client from '../../../config/cache.config';

const actions = ['findAll', 'create', 'destroy', 'update'];

actions.forEach((action) => {
    const actionFunc = Model[action];

    Model[action] = async function () {
        const key = JSON.stringify({
            collection: this.tableName,
            ...arguments[arguments.length - 1],
        });
        const cachedData = await client.get(key);

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const result = await actionFunc.apply(this, arguments);

        await client.set(key, JSON.stringify(result));

        return result;
    };
});

Model.__proto__.cache = function () {
    return this;
};
