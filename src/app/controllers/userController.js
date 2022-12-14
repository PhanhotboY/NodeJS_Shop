import userService from '../../services/userService';

const userController = {
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
        const limit = req.query.limit;
        const isDeleted = req.query.deleted === 'true';

        const data = await userService.getAllUser(limit, isDeleted);

        return res.status(200).json(data);
    },

    async handleGetUser(req, res, next) {
        const userId = req.params.id;
        const isDeleted = req.query.deleted === 'true';

        if (!userId)
            return res.status(200).json({
                errType: 'parameter',
                message: 'Missing user id!',
            });

        const data = await userService.getSingleUser(userId, isDeleted);

        return res.status(200).json(data);
    },

    async handleUpdateUser(req, res, next) {
        const userId = req.params.id;
        const updateData = req.body;

        if (!userId)
            return res.status(200).json({
                errType: 'parameter',
                message: 'Missing user id!',
            });

        const data = await userService.updateUser(userId, updateData);

        return res.status(200).json(data);
    },

    async handleDeleteUser(req, res, next) {
        const userId = req.params.id;
        const isPermanently = req.query.permanently === 'true';

        if (!userId)
            return res.status(200).json({
                errType: 'parameter',
                message: 'Missing user id!',
            });

        const data = await userService.deleteUser(userId, isPermanently);

        return res.status(200).json(data);
    },

    async handlePatchUser(req, res, next) {
        const userId = req.params.id;
        const payload = req.body;

        if (!userId)
            return res.status(200).json({
                errType: 'parameter',
                message: 'Missing user id!',
            });

        let data = {};

        switch (payload.action) {
            case 'restore':
                data = await userService.restoreUser(userId);

                return res.status(200).json(data);
        }
    },
};

export default userController;
