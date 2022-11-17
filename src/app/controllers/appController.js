import appService from '../../services/appService';

const appController = {
    async handleGetAllcodes(req, res, next) {
        const type = req.params.type || '';
        const limit = req.query.limit;

        const data = await appService.getAllData({
            modelName: 'allcode',
            type: type.toUpperCase(),
            limit,
        });

        return res.status(200).json(data);
    },
};

export default appController;
