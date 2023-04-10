require('dotenv').config();

const env = process.env;

module.exports = {
    development: {
        database: 'shopee',
        username: 'postgres',
        password: 'phan0344800574',
        host: 'localhost',
        port: '5432',
        dialect: 'postgres',
        dialectOptions:
            env.DB_SSL === 'true'
                ? {
                      ssl: {
                          require: true,
                          rejectUnauthorized: false,
                      },
                  }
                : {},
        logging: false,
        query: {
            nest: true,
            raw: true,
        },
        timezome: '+07:00',
    },
    test: {
        username: 'postgres',
        host: env.DEV_DATABASE_URL,
        password: null,
        database: 'database_test',
        dialect: 'postgres',
    },
    production: {
        database: env.DB_DATABASE_NAME,
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        host: env.DB_HOST,
        port: env.DB_PORT,
        dialect: 'postgres',
        dialectOptions:
            env.DB_SSL === 'true'
                ? {
                      ssl: {
                          require: true,
                          rejectUnauthorized: false,
                      },
                  }
                : {},
        logging: false,
        query: {
            nest: true,
            raw: true,
        },
        timezome: '+07:00',
    },
};
