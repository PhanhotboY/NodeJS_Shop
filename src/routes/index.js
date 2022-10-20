const siteRoute = require('./site');
const apiRoute = require('./api');

const routes = (app) => {
    app.use('/api', apiRoute);

    app.use('/', siteRoute);
};

module.exports = routes;
