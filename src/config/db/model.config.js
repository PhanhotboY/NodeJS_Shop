'use strict';

const util = require('util');
const path = require('path');
const dir = require('node-dir');
const db = require('./connect.config');

dir.files = util.promisify(dir.files);

const modelsDir = path.join(path.dirname(__dirname), '..', '/api/v1');

(async function loadModels() {
    try {
        const dirs = await dir.files(modelsDir, 'dir');

        for (const dir of dirs) {
            try {
                const modelDir = `${dir}/${path.basename(dir)}.model.js`;

                const model = await require(modelDir)(db.sequelize, db.Sequelize.DataTypes);

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

        await db.sequelize.sync();
    } catch (err) {
        console.error(err);
    }
})();

module.exports = db;
