import queryHelper from '../helpers/query.helper';
import { checkDataValidity, isUserExist, isSamePassword } from './user.validation';
import { hashUserPassword } from './user.service';

const modelName = 'User';

const userHandler = {
    async handleUserLogin({ email = '', password = '' }) {
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

    async handleUserSignup(data) {
        const validateMessage = await checkDataValidity(data);

        if (validateMessage.errType) {
            return validateMessage;
        }

        if (await isUserExist({ email: data.email })) {
            return {
                errType: 'email',
                message: 'Email already exist. Please try another email!',
            };
        }

        const hashedPassword = await hashUserPassword(data.password);

        data = { ...data, password: hashedPassword };

        return await queryHelper.createNewRecord(modelName, data);
    },
};

export default userHandler;
