const env = process.env;

module.exports = {
    port: env.PORT || 8080,
    host: env.HOST,
    redisHost: env.REDIS_HOST,
    redisPort: env.REDIS_PORT,
    redisUser: env.REDIS_USER,
    redisPassword: env.REDIS_PASSWORD,
    awsAccessKey: env.AWS_ACCESS_KEY,
    awsSecretKey: env.AWS_SECRET_KEY,
    googleClientID: env.GOOGLE_CLIENT_ID,
    googleClientSecret: env.GOOGLE_CLIENT_SECRET,
    cookieKeys: [env.COOKIE_KEY1, env.COOKIE_KEY2],
    stripePublishableKey: env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: env.STRIPE_SECRET_KEY,
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
