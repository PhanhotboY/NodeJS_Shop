const path = require('path');
const express = require('express');
const passport = require('passport');

const cleanCache = require('../../middlewares/cleanCache');

const authRoute = express.Router();

authRoute.get(
    '/google',
    cleanCache,
    async (req, res, next) => {
        const clientRedirectPath = decodeURIComponent(req.query.redirect || '/');

        const clientRedirectURL = path.join(req.headers.referer, 'login' + clientRedirectPath);

        req.session.clientRedirectURL = clientRedirectURL;

        next();
    },
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        // prompt: 'consent',
    })
);

authRoute.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/api/auth/fail',
    }),
    (req, res) => {
        const clientRedirectURL = req.session.clientRedirectURL;
        delete req.session.clientRedirectURL;
        console.log('===== logging from callback: ', req.session);
        res.redirect(clientRedirectURL);
    }
);

authRoute.get('/fail', (req, res) => {
    res.status(401).json({
        errType: 'login',
        message: 'Authenticate fail!',
        userInfo: null,
    });
});

authRoute.get('/logout', (req, res) => {
    req.logout();

    res.status(200).json({
        errType: null,
        message: 'Log out successfully. See Ya!',
    });
});

module.exports = authRoute;
