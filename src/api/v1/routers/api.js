const express = require('express');

const userRoute = require('../user/user.route');

const apiRoute = express.Router();

//All
apiRoute.get('/all', (req, res) => {
    return res.status(200).json({ message: 'Server is being Error!' });
});

apiRoute.use('/users', userRoute);

// //APP
// apiRoute.get('/allcodes/:type', appController.handleGetAllcodes);
// apiRoute.get('/users/:id/notifications', appController.handleGetAllNotifications);

// //USER
// apiRoute.post('/users/login', userController.handleUserLogin);

// apiRoute.post('/users/signup', userController.handleUserSignup);

// apiRoute.put('/users/:id', userController.handleUpdateUser);

// apiRoute.delete('/users/:id', userController.handleDeleteUser);

// apiRoute.patch('/users/:id', userController.handlePatchUser);

// apiRoute.get('/users/:id', userController.handleGetUser);
// apiRoute.get('/users', userController.handleGetAllUser);

module.exports = apiRoute;
