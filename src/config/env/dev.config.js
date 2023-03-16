const env = process.env;

module.exports = {
    cookieKey: '',
    googleClientID: '',
    googleClientSecret: '',
    host: 'http://localhost',
    port: 8080,
    redisURI: 'redis://default@localhost:6379',
    database: {
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
