import fs from 'fs';
import cors from 'cors';
import path from 'path';
import https from 'https';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

//map .env into environment variables (async => import before other file that use env var)
import 'dotenv/config';

const app = express();

import './config/passport.config';
import './api/v1/helpers/cache.helper';
import routes from './api/v1/routers';
import keys from './config/keys.config';
import client from './config/cache.config';
import db from './config/db/connect.config';

app.use(helmet());

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
        allowedHeaders: ['X-PINGOTHER', 'Content-Type'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    })
);
app.options('*', cors({ origin: true, credentials: true }));

app.use(morgan('combined'));

// parse body
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(cookieParser(keys.cookieKeys));
app.use(bodyParser.json());

//connect database
db.connect();

client.connect();

//config passport and session
app.use(
    cookieSession({
        name: 'session',
        keys: keys.cookieKeys,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

routes(app);

if (process.env.NODE_ENV === 'develop') {
    https
        .createServer(
            {
                key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),
                cert: fs.readFileSync(path.join(__dirname, '..', 'cert.pem')),
                passphrase: process.env.OPENSSL_PASSPHRASE,
            },
            app
        )
        .listen(keys.port, () => {
            console.log(
                `hello world from port ${keys.port} in ${process.env.NODE_ENV} environment`
            );
        });
} else {
    app.listen(keys.port, () => {
        console.log(`hello world from port ${keys.port} in ${process.env.NODE_ENV} environment`);
    });
}
