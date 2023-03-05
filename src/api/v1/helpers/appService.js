import crudService from './CRUDService';
import { checkUserExist } from './userService';
import db from '../models';

const appService = {
    async getAllCodesData({ modelName, type }) {
        try {
            const response = await crudService.getAllData(toSingularForm(modelName), {
                where: { type: type.toUpperCase() },
            });

            return response;
        } catch (err) {
            return err;
        }
    },

    async getNotifications({ userId }) {
        if (!userId) {
            return {
                errType: null,
                message: 'Missing required parameter!',
                payload: [],
            };
        }
        const isUserExist = await checkUserExist({ userId });

        if (!isUserExist) {
            return {
                errType: null,
                message: 'User is not exist!',
                payload: [],
            };
        }

        try {
            const response = await crudService.getSingleData('User', {
                where: { id: userId },
                include: 'Notification',
                raw: false,
                nest: true,
            });

            response.payload = response.payload.Notification;

            return response;
        } catch (err) {
            return err;
        }
    },
};

const toSingularForm = (noun) => {
    if (noun.slice(-1) === 's') return noun.slice(0, -1);

    return noun;
};

export default appService;
