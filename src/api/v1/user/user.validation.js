import bcrypt from 'bcryptjs';

import queryHelper from '../helpers/query.helper';

const regexCheckPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const regexCheckEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
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

    async isUserExist({ email, id, paranoid = true }) {
        try {
            const users = await queryHelper.getAllData('Users', {
                attributes: ['id'],
                where: { [email ? 'email' : 'id']: email || id },
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

        return {
            errType: null,
            message: 'Ok',
        };
    },
};
