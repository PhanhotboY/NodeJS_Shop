import db from '../models';
import bcrypt from 'bcryptjs';
import crudService from './CRUDService';

const regexCheckPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const regexCheckEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
const regexCheckURL =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const regexCheckPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const userService = {
    async handleUserLogin(data) {
        let validateMessage = {};

        const isUserExist = await checkUserEmail(data.email);

        if (!isUserExist) {
            validateMessage.errType = 'email';
            validateMessage.message = 'User is not exist. Please try again!';
            return validateMessage;
        }

        validateMessage = await crudService.compareUserPassword(data);

        return validateMessage;
    },

    async handleUserSignup(data) {
        let validateMessage = await checkValidityData(data);

        if (validateMessage.errType) {
            return validateMessage;
        }

        const isUserExist = await checkUserEmail(data.email);

        if (isUserExist) {
            validateMessage.errType = 'email';
            validateMessage.message =
                'Email already exist. Please try another email!';

            return validateMessage;
        }

        validateMessage = await crudService.createNewUser(data);

        return validateMessage;
    },
};

const checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findAll({
                attributes: ['user_id'],
                where: { email },
            });
            if (user.length) {
                resolve(true);
            }
            resolve(false);
        } catch (err) {
            reject(err);
        }
    });
};

const checkValidityData = ({ email, password, phoneNumber, avatarURL }) => {
    const checkingRes = {
        errType: null,
        message: 'Ok',
    };

    if (email && !email.match(regexCheckEmail)) {
        checkingRes.errType = 'email';
        checkingRes.message = `Invalid email. Try again!`;
        return checkingRes;
    }

    if (password && !password.match(regexCheckPassword)) {
        checkingRes.errType = 'password';
        checkingRes.message = `Invalid password. Try again!`;
        return checkingRes;
    }

    if (phoneNumber && !phoneNumber.match(regexCheckPhoneNumber)) {
        checkingRes.errType = 'phoneNumber';
        checkingRes.message = `Invalid phone number. Try again!`;
        return checkingRes;
    }

    if (avatarURL && !avatarURL.match(regexCheckURL)) {
        checkingRes.errType = 'avatar';
        checkingRes.message = `Invalid URL. Try again!`;
        return checkingRes;
    }

    return checkingRes;
};

export default userService;
