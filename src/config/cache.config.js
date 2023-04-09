const { createClient } = require('redis');

const keys = require('./keys.config');

const client = createClient({
    socket: {
        host: keys.redisHost,
        port: keys.redisPort,
    },
    username: keys.redisUser,
    password: keys.redisPassword,
});

client.on('connect', () => console.log('>>>>> Redis connection established successfully!'));

client.on('error', (err) => {
    console.error('oh nooo-----------------------');
    console.error('>>>> Unable to connect to the Redis server:', err);
});

module.exports = client;
