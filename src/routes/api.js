const express = require('express');
const apiRoute = express.Router();

const apiController = require('../app/controllers/apiController');

//LOGIN
apiRoute.post('/login', apiController.handleUserLogin);

//SIGN UP
apiRoute.post('/signup', apiController.handleUserSignup);

//GET
apiRoute.get('/get/:type', apiController.handleGetData);
apiRoute.get('/get-deleted/:type', apiController.handleGetDeletedData);
apiRoute.put('/update/:type', apiController.handleUpdateData);
apiRoute.patch('/restore/:type', apiController.handleRestoreData);
apiRoute.delete('/delete/:type', apiController.handleDeleteData);
apiRoute.delete(
    '/delete-permanently/:type',
    apiController.handleDeletePermanentlyData
);

module.exports = apiRoute;
