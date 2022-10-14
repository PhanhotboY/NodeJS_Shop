const { sequelize } = require('../../config/db');
import { CommandCompleteMessage } from 'pg-protocol/dist/messages';
import db from '../../models';
import userService from '../../services/userService';
import crudService from '../../services/CRUDService';

const apiController = {
    async handleUserLogin(req, res, next) {
        const { email, password } = req.body;

        const loginRespondMessage = await userService.handleUserLogin({
            email,
            password,
        });

        return res.status(200).json(loginRespondMessage);
    },

    async handleUserSignup(req, res, next) {
        const signupRespondMessage = await userService.handleUserSignup(
            req.body
        );

        return res.status(200).json(signupRespondMessage);
    },

    async handleGetData(req, res, next) {
        const dataType = req.params.type;
        const userId = req.query.id;

        let data = await crudService.getUser(dataType, userId);

        return res.status(200).json(data);
    },

    async handleGetDeletedData(req, res, next) {
        const dataType = req.params.type;

        let data = await crudService.getDeletedUser(dataType);

        return res.status(200).json(data);
    },

    async handleUpdateData(req, res, next) {
        const updateData = req.body;

        let data = await crudService.updateUser(updateData);

        return res.status(200).json(data);
    },

    async handleDeleteData(req, res, next) {
        const userId = req.query.id;

        let data = await crudService.deleteUser(userId);

        return res.status(200).json(data);
    },

    async handleDeletePermanentlyData(req, res, next) {
        const userId = req.query.id;

        let data = await crudService.deletePermanentlyUser(userId);

        return res.status(200).json(data);
    },

    async handleRestoreData(req, res, next) {
        const userId = req.query.id;

        let data = await crudService.restoreUser(userId);

        return res.status(200).json(data);
    },
};

module.exports = apiController;
