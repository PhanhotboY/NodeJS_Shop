const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV;
const config = require('./sequelize.config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('>>>>> Database connection has been established successfully.');
    } catch (error) {
        console.error('oh nooo-----------------------');
        console.error('>>>> Unable to connect to the database:', error);
    }

    return;
};

const close = async () => {
    try {
        await sequelize.close();
        console.log('Connection has been closed successfully.');
    } catch (error) {
        console.error('Unable to close the database:', error);
    }
};

const db = { sequelize, connect, close };

module.exports = db;
