const { v4: uuidv4 } = require('uuid');

const { roles } = require('../helpers/constant');
const queryHelper = require('../helpers/query.helper');
const stripe = require.main.require('./config/stripe.config');
const { hashUserPassword } = require('./user.service');
const { checkDataValidity, isUserExist, isSamePassword } = require('./user.validation');

const modelName = 'Users';

const userHandler = {
    async login({ email = '', password = '' }) {
        const queryOption = {
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt'],
            },
            where: { email },
        };

        const queryData = await queryHelper.getSingleData(modelName, queryOption);

        if (!queryData.payload) {
            return {
                errType: 'email',
                message: 'User not exist. Please try again!',
            };
        }

        if (await isSamePassword(password, queryData.payload.password)) {
            delete queryData.payload.password;

            return {
                errType: null,
                message: 'Valid password. Welcome!',
                userInfo: queryData.payload,
            };
        }
        return {
            errType: 'password',
            message: 'wrong password. Please try again!',
        };
    },

    async signup(user) {
        const validateMessage = await checkDataValidity(user);

        if (validateMessage.errType) {
            return validateMessage;
        }

        if (user.email && user.password) {
            if (await isUserExist({ email: user.email })) {
                return {
                    errType: 'email',
                    message: 'Email already exist. Please try another email!',
                };
            }

            const hashedPassword = await hashUserPassword(user.password);

            user = { id: uuidv4(), ...user, password: hashedPassword };
        }

        try {
            const customer = await stripe.customers.create({
                name: user.lastName + ' ' + user.firstName,
                email: user.email,
                address: user.address,
            });

            user.stripeId = customer.id;
        } catch (err) {
            return {
                errType: 'create',
                message: err.message,
            };
        }

        user = {
            ...user,
            roleId: user.roleId || roles.USER,
        };

        const result = await queryHelper.createNewRecord(modelName, user);

        result.userInfo = result.payload;
        delete result.payload;

        return result;
    },
};

export default userHandler;
