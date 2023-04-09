const express = require('express');
const path = require('path');

const authRoute = require('./api/auth');
const userRoute = require('../user/user.route');
const checkoutRoute = require('./api/checkout');
const uploadMiddleware = require('../middlewares/upload');

const apiRoute = express.Router();

apiRoute.use('/users', userRoute);

apiRoute.use('/auth', authRoute);

apiRoute.use('/checkout', checkoutRoute);

// //APP
// apiRoute.get('/allcodes/:type', appController.handleGetAllcodes);
// apiRoute.get('/users/:id/notifications', appController.handleGetAllNotifications);

//All avaiable apis
apiRoute.get('/all', (req, res) => {
    return res.status(200).json({
        APIs: 'All available',
        'Get all codes of each type': {
            route: 'GET /api/allcodes/:type',
            _comment:
                'type = gender || role || shoptype || status || vouchertype || overlay || category',
        },
        "Get user's notifications": 'GET /users/:userId/notifications',
        "Get user's information": {
            route: 'GET /api/users/:userId?isDeleted=',
            _comment: "isDeleted === 'true' ? true : false",
        },
        "Get all users' infomation": {
            route: 'GET /api/users?isDeleted=&limit=',
            _comment: 'limit: Positive Integers',
        },
        'Handle login': {
            route: 'POST /api/users/login',
            _comment: 'body = {email, password}',
        },
        'Handle signup': {
            route: 'POST /api/users/signup',
            _comment:
                'body = {email, password, firstName, lastName, gender, phone, address, avatar}',
        },
        'Update user': {
            route: 'PUT /api/users/:userId',
            _comment: 'body = {firstName, lastName, gender, phone, address, avatar, roleId}',
        },
        'Delete user': {
            route: 'DELETE /api/users/:userId?isPermanently=',
            _comment: "isPermanently === 'true' ? true : false",
        },
        'Other actions on user': {
            route: 'PATCH /api/users/:userId=',
            _comment: "body = {action: 'restore' || comming soon...}",
        },
    });
});

apiRoute.post('/upload', uploadMiddleware);

apiRoute.get('/', (req, res) => {
    return res.status(301).redirect(path.join(req.baseUrl, 'all'));
});

module.exports = apiRoute;
