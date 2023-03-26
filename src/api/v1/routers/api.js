const express = require('express');
const path = require('path');

const userRoute = require('../user/user.route');
const uploadMiddleware = require('../middlewares/upload');

const apiRoute = express.Router();

apiRoute.use('/users', userRoute);

// //APP
// apiRoute.get('/allcodes/:type', appController.handleGetAllcodes);
// apiRoute.get('/users/:id/notifications', appController.handleGetAllNotifications);

//All
apiRoute.get('/all', (req, res) => {
    return res.status(200).json({ message: 'Server is being Error!' });
});

apiRoute.post('/upload', uploadMiddleware);

apiRoute.get('/', (req, res) => {
    return res.status(301).redirect(path.join(req.baseUrl, 'all'));
});

module.exports = apiRoute;
