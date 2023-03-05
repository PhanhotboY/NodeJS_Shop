require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions:
            process.env.DB_SSL === 'true'
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
        host: process.env.DEV_DATABASE_URL,
        password: null,
        database: 'database_test',
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions:
            process.env.DB_SSL === 'true'
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
