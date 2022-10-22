import userService from '../../services/userService';

const apiController = {
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
};

module.exports = apiController;
