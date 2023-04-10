const express = require('express');

const cleanCache = require('../middlewares/cleanCache');
const { requireLoggedIn } = require('../middlewares/auth');

const userRoute = express.Router();

import userController from './user.controller';

userRoute.post('/login', userController.handleUserLogin);

userRoute.post('/signup', cleanCache, userController.handleUserSignup);

userRoute.put('/:id', requireLoggedIn, cleanCache, userController.handleUpdateUser);

userRoute.delete('/:id', requireLoggedIn, cleanCache, userController.handleDeleteUser);

userRoute.patch('/:id', requireLoggedIn, cleanCache, userController.handlePatchUser);

userRoute.get('/current', requireLoggedIn, userController.handleGetUser);
userRoute.get('/:id', userController.handleGetUser);
userRoute.get('/', requireLoggedIn, userController.handleGetAllUser);

module.exports = userRoute;
