const express = require('express');
const apiRoute = express.Router();

const apiController = require('../app/controllers/apiController');

//LOGIN
apiRoute.post('/user/login', apiController.handleUserLogin);

//SIGN UP
apiRoute.post('/user/signup', apiController.handleUserSignup);

//GET
apiRoute.get('/user/all', apiController.handleGetAllUser);
apiRoute.get('/user/single', apiController.handleGetUser);
apiRoute.put('/user/update', apiController.handleUpdateUser);
apiRoute.patch('/user/restore', apiController.handleRestoreUser);
apiRoute.delete('/user/delete', apiController.handleDeleteUser);

module.exports = apiRoute;
