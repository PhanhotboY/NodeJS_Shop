const env = process.env.NODE_ENV;

if (env === 'production' || env === 'test') {
    module.exports = require('./env/prod.config');
} else if (env === 'ci') {
    module.exports = require('./env/ci.config');
} else {
    module.exports = require('./env/dev.config');
}
