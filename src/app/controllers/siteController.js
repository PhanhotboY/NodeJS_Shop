const { sequelize } = require('../../config/db');

const siteController = {
    home(req, res, next) {
        return res.render('products');
    },
};

module.exports = siteController;
