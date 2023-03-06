const apiRoute = require('./api');

const routes = (app) => {
    app.use('/api', apiRoute);

    app.use('/', (req, res) => {
        res.send('Wait a minutes from Home page!');
    });
};

module.exports = routes;
