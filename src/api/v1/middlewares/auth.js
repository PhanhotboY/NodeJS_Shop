const keys = require.main.require('./config/keys.config');

module.exports = {
    requireLoggedIn: async (req, res, next) => {
        if (req.isUnauthenticated())
            return res.status(401).json({
                errType: 'authenticate',
                message: 'You are not authenticated. Please authenticate to continue!',
            });

        if (!req.user) {
            return res.redirect(keys.clientHost + '/login');
        }

        next();
    },
};
