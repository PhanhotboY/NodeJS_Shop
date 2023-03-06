'use strict';

const util = require('util');
const path = require('path');
const dir = require('node-dir');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./env.config')[env];

dir.files = util.promisify(dir.files);

let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};
const modelsDir = path.join(path.dirname(__dirname), '..', '/api/v1');

dir.files(modelsDir, 'dir')
    .then((dirs) => {
        dirs.forEach((dir) => {
            try {
                const modelDir = dir + dir.slice(dir.lastIndexOf('/')) + '.model.js';

                const model = require(modelDir)(sequelize, Sequelize.DataTypes);
                db[model.name] = model;
            } catch (error) {
                return;
            }
        });
    })
    .catch((err) => console.error(err));

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
