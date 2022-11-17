import crudService from './CRUDService';

const appService = {
    async getAllData({ modelName, type, limit = 30 }) {
        const response = await crudService.getAllData(toSingularForm(modelName), {
            where: { type },
            limit,
        });

        return response;
    },
};

const toSingularForm = (noun) => {
    if (noun.slice(-1) === 's') return noun.slice(0, -1);

    return noun;
};

export default appService;
