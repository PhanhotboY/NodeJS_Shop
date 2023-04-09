import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import keys from './keys.config';
import userHandler from '../api/v1/user/user.handler';
import userService from '../api/v1/user/user.service';
import { isUserExist } from '../api/v1/user/user.validation';

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const res = await userService.getSingleUser(id);

        if (!res.errType && res.userInfo) return done(null, res.userInfo);

        done(null, { id });
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            callbackURL: '/api/auth/google/callback',
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
        },
        async (accessToken, refreshToken, profile, done) => {
            //handle log in and sign up with returned user profile
            /**
             * id
             * emails[0]
             * name: {familyName, givenName}
             * photos[0].value
             */

            const user = {
                id: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                avatar: profile.photos[0].value,
            };

            if (await isUserExist({ id: user.id })) {
                return done(null, user);
            }

            try {
                const signupResult = await userHandler.signup(user);

                if (signupResult && !signupResult.errType) return done(null, user);

                throw new Error(signupResult.message);
            } catch (err) {
                console.log('something wrong right before callback: ', err.message);
                return done(err, null);
            }
        }
    )
);
