const siteRoute = require('./site');
const apiRoute = require('./api');
const productRoute = require('./product');

const routes = (app) => {
    app.use('/products', productRoute);

    app.use('/api', apiRoute);

    app.use('/', siteRoute);
};

module.exports = routes;
