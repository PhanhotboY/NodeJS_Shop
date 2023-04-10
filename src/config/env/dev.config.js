const env = process.env;

module.exports = {
    port: 6868,
    host: 'https://localhost',
    clientHost: 'http://localhost:3000',
    redisURI: 'redis://default@localhost:6379',
    awsAccessKey: env.AWS_ACCESS_KEY,
    awsSecretKey: env.AWS_SECRET_KEY,
    googleClientID: env.GOOGLE_CLIENT_ID,
    googleClientSecret: env.GOOGLE_CLIENT_SECRET,
    cookieKeys: [env.COOKIE_KEY1, env.COOKIE_KEY2],
    stripePublishableKey: env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: env.STRIPE_SECRET_KEY,
    database: {
        port: '5432',
        host: 'localhost',
        database: 'shopee',
        dialect: 'postgres',
        username: 'postgres',
        password: 'phan0344800574',
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
