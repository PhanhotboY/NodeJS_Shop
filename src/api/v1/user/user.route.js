const express = require('express');

import cleanCache from '../middlewares/cleanCache.js';

const userRoute = express.Router();

import userController from './user.controller';

userRoute.post('/login', userController.handleUserLogin);

userRoute.post('/signup', userController.handleUserSignup);

userRoute.put('/:id', cleanCache, userController.handleUpdateUser);

userRoute.delete('/:id', userController.handleDeleteUser);

userRoute.patch('/:id', userController.handlePatchUser);

userRoute.get('/:id', userController.handleGetUser);
userRoute.get('/', userController.handleGetAllUser);

module.exports = userRoute;
