import { sequelize } from '../../config/db';

const apiController = {
    async all(req, res, next) {
        const data = {
            APIs: 'All available',
            'Get all codes of each type': {
                route: 'GET /api/allcodes/:type',
                _comment:
                    '[gender, role, shoptype, status, vouchertype, overlay, category].includes(type)',
            },
            "Get user's notifications": 'GET /users/:userId/notifications',
            "Get user's information": {
                route: 'GET /api/users/:userId?isDeleted=',
                _comment: "isDeleted === 'true' ? true : false",
            },
            "Get all users' infomation": {
                route: 'GET /api/users?isDeleted=&limit=',
                _comment: 'limit: Positive Integers',
            },
            'Handle login': {
                route: 'POST /api/users/login',
                _comment: 'body = {email, password}',
            },
            'Handle signup': {
                route: 'POST /api/users/signup',
                _comment:
                    'body = {email, password, firstName, lastName, gender, phone, address, avatar}',
            },
            'Update user': {
                route: 'PUT /api/users/:userId',
                _comment: 'body = {firstName, lastName, gender, phone, address, avatar, roleId}',
            },
            'Delete user': {
                route: 'DELETE /api/users/:userId?isPermanently=',
                _comment: "isPermanently === 'true' ? true : false",
            },
            'Other actions on user': {
                route: 'PATCH /api/users/:userId=',
                _comment: "body = {action: 'restore' || comming soon...}",
            },
        };

        res.json(data);
    },
};

module.exports = apiController;
