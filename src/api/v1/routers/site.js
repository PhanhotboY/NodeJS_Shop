const express = require('express');
const siteRoute = express.Router();

// const siteController = require('siteController');

siteRoute.get('/', (req, res) => {
    res.send(
        `<div>
            Thank you for visit my site! You can view all available APIs from 
            <a href='/api/all'>here</a>.
        </div>`
    );
});

module.exports = siteRoute;
