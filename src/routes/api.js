const express = require('express');
const apiRoute = express.Router();

const apiController = require('../app/controllers/apiController');

//USER
apiRoute.post('/user/login', apiController.handleUserLogin);

apiRoute.post('/user/signup', apiController.handleUserSignup);

apiRoute.get('/user/all', apiController.handleGetAllUser);
apiRoute.get('/user/single', apiController.handleGetUser);

apiRoute.put('/user/update', apiController.handleUpdateUser);

apiRoute.delete('/user/delete', apiController.handleDeleteUser);

apiRoute.patch('/user/restore', apiController.handleRestoreUser);
apiRoute.patch('/user/search', apiController.handleAddKeyword);

apiRoute.get('/:model', apiController.handleGetData);

module.exports = apiRoute;
