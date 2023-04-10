const apiRoute = require('./api');
const siteRoute = require('./site');

const routes = (app) => {
    app.use('/api', apiRoute);

    app.use('/', siteRoute);
};

module.exports = routes;
