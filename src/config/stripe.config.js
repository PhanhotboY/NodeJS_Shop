const keys = require('./keys.config');

module.exports = require('stripe')(keys.stripeSecretKey);
