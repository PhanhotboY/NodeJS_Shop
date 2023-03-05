const express = require('express');
const siteRoute = express.Router();

const siteController = require('../app/controllers/siteController');

siteRoute.get('/', siteController.home);

module.exports = siteRoute;
