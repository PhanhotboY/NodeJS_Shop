import userService from '../../services/userService';
import appService from '../../services/appService';

const apiController = {
    //USER
    async handleUserLogin(req, res, next) {
        const { email, password } = req.body;

        const loginRespondMessage = await userService.handleUserLogin({ email, password });

        return res.status(200).json(loginRespondMessage);
    },

    async handleUserSignup(req, res, next) {
        const signupRespondMessage = await userService.handleUserSignup(req.body);

        return res.status(200).json(signupRespondMessage);
    },

    async handleGetAllUser(req, res, next) {
        const limit = req.query.limit || 30;
        const isDeleted = req.query.isDeleted === 'true';

        const data = await userService.getAllUser(limit, isDeleted);

        return res.status(200).json(data);
    },

    async handleGetUser(req, res, next) {
        const userId = req.query.id;
        const isDeleted = req.query.isDeleted === 'true';

        const data = await userService.getSingleUser(userId, isDeleted);

        return res.status(200).json(data);
    },

    async handleUpdateUser(req, res, next) {
        const updateData = req.body;

        const data = await userService.updateUser(updateData);

        return res.status(200).json(data);
    },

    async handleDeleteUser(req, res, next) {
        const userId = req.query.id;
        const isPermanently = req.query.isPermanently === 'true';
        console.log(req.query.isPermanently);

        const data = await userService.deleteUser(userId, isPermanently);

        return res.status(200).json(data);
    },

    async handleRestoreUser(req, res, next) {
        const userId = req.query.id;

        const data = await userService.restoreUser(userId);

        return res.status(200).json(data);
    },

    async handleAddKeyword(req, res, next) {
        const { userId } = req.body;
        const keyword = req.query.keyword;

        const data = await userService.addKeyword(userId, keyword);

        return res.status(200).json(data);
    },

    async handleGetData(req, res, next) {
        const slug = req.params.model;
        const limit = req.query.limit;
        const id = Number(req.query.id);

        const data = await appService.getData(slug, id, limit);

        res.status(200).json(data);
    },
};

module.exports = apiController;
