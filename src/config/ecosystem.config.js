const os = require('os');

module.exports = {
    apps: [
        {
            name: 'shopee',
            script: 'src/index.js',
            interpreter: 'babel-node',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
