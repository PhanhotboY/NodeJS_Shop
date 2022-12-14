const express = require('express');
const apiRoute = express.Router();

import appController from '../app/controllers/appController';
import userController from '../app/controllers/userController';
import productController from '../app/controllers/productController';

//USER
apiRoute.post('/users/login', userController.handleUserLogin);

apiRoute.post('/users/signup', userController.handleUserSignup);

apiRoute.put('/users/:id', userController.handleUpdateUser);

apiRoute.delete('/users/:id', userController.handleDeleteUser);

apiRoute.patch('/users/:id', userController.handlePatchUser);

apiRoute.get('/users/:id', userController.handleGetUser);
apiRoute.get('/users', userController.handleGetAllUser);

//APP
apiRoute.get('/allcodes/:type', appController.handleGetAllcodes);

module.exports = apiRoute;
