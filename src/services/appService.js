import { response } from 'express';
import { Op } from 'sequelize';
import db, { sequelize } from '../models';

import crudService, { capitalizeFirstLetter as $ } from './CRUDService';

const appService = {
    async getData(slug, id, limit) {
        const response = await crudService.getSingleData($(slug), {
            where: { id },
            include: db.User,
        });

        await response.payload.addUsers([1]);
        return response;
        // if (id) {
        //     const queryOption = {
        //         attributes: {
        //             exclude: ['createdAt', 'updatedAt'],
        //         },
        //         where: { [`${slug}Id`]: id },
        //     };

        //     return await crudService.getSingleData($(slug), queryOption);
        // } else if (limit) {
        //     const queryOption = {
        //         limit: Number(limit) || 5,
        //     };

        //     return await crudService.getAllData($(slug), queryOption);
        // }

        // return {
        //     errType: 'parameter',
        //     message: 'missing parameter!',
        // };
    },
};

export default appService;
