const env = process.env;

module.exports = {
    cookieKey: env.COOKIE_KEY,
    googleClientID: env.GOOGLE_CLIENT_ID,
    googleClientSecret: env.GOOGLE_CLIENT_SECRET,
    host: env.HOST,
    port: env.PORT,
    redisURI: env.REDIS_URI,
    awsAccessKey: env.AWS_ACCESS_KEY,
    awsSecretKey: env.AWS_SECRET_KEY,
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