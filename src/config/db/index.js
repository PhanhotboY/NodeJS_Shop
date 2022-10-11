const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'postgres://postgres:phan0344800574@localhost:5433/shopee'
);

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
module.exports.connect = connect;
module.exports.close = close;
