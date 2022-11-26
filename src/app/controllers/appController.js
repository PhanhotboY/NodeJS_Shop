import appService from '../../services/appService';

const appController = {
    async handleGetAllcodes(req, res, next) {
        const type = req.params.type || '';

        const data = await appService.getAllCodesData({
            modelName: 'allcode',
            type,
        });

        return res.status(200).json(data);
    },

    async handleGetAllNotifications(req, res, next) {
        const userId = req.params.id;

        const data = await appService.getNotifications({ userId });

        return res.status(200).json(data);
    },
};

export default appController;
