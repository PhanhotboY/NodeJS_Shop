'use strict';

const util = require('util');
const path = require('path');
const dir = require('node-dir');
const Sequelize = require('sequelize');
const { database } = require('../keys.config');

dir.files = util.promisify(dir.files);

const sequelize = new Sequelize(database.database, database.username, database.password, database);

const db = {};
const modelsDir = path.join(path.dirname(__dirname), '..', '/api/v1');

(async function loadModels() {
    try {
        const dirs = await dir.files(modelsDir, 'dir');

        for (const dir of dirs) {
            try {
                const modelDir = `${dir}/${path.basename(dir)}.model.js`;
                const model = require(modelDir)(sequelize, Sequelize.DataTypes);
                db[model.name] = model;
            } catch (err) {
                continue;
            }
        }

        for (const modelName of Object.keys(db)) {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        }

        await sequelize.sync();
        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
    } catch (err) {
        console.error(err);
    }
})();

module.exports = db;
