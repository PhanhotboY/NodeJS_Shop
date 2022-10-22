const { Sequelize } = require('sequelize');
import { Pool } from 'pg';

const sequelize = new Sequelize('postgres://postgres:phan0344800574@localhost:5433/shopee');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shopee_images',
    password: 'phan0344800574',
    port: 5433,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('>>>>connect pool successfully!');
    });
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('>>>>> Connection has been established successfully.');
    } catch (error) {
        console.error('oh nooo-----------------------');
        console.error('>>>> Unable to connect to the database:', error);
    }
};

const close = async () => {
    try {
        await sequelize.close();
        console.log('Connection has been closed successfully.');
    } catch (error) {
        console.error('Unable to close the database:', error);
    }
};

module.exports.sequelize = sequelize;
module.exports.pool = pool;
module.exports.connect = connect;
module.exports.close = close;
