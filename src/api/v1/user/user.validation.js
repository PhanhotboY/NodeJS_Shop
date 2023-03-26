import bcrypt from 'bcryptjs';

import queryHelper from '../helpers/query.helper';

const regexCheckPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const regexCheckEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
const regexCheckURL =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const regexCheckPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

module.exports = {
    async isSamePassword(inputPassword, userPassword) {
        try {
            const result = await bcrypt.compareSync(inputPassword, userPassword);

            return result;
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },

    async isUserExist({ email, userId, paranoid = true }) {
        try {
            const users = await queryHelper.getAllData(modelName, {
                attributes: ['id'],
                where: { [email ? 'email' : 'id']: email || userId },
                paranoid,
            });

            return Boolean(users.payload.length);
        } catch (err) {
            console.error(err.message);
            return false;
        }
    },

    checkDataValidity({ email, password, phoneNumber, avatarURL }) {
        if (email && !email.match(regexCheckEmail)) {
            return {
                errType: 'email',
                message: 'Invalid email. Try again!',
            };
        }

        if (password && !password.match(regexCheckPassword)) {
            return {
                errType: 'password',
                message: `Invalid password. Try again!`,
            };
        }

        if (phoneNumber && !phoneNumber.match(regexCheckPhoneNumber)) {
            return { errType: 'phoneNumber', message: `Invalid phone number. Try again!` };
        }

        if (avatarURL && !avatarURL.match(regexCheckURL)) {
            return { errType: 'avatar', message: `Invalid URL. Try again!` };
        }

        return {
            errType: null,
            message: 'Ok',
        };
    },
};
