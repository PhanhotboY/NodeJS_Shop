import cors from 'cors';
import path from 'path';
// import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';

//map .env into environment variables (async => import before other file that use env var)
import 'dotenv/config';

import route from './routes';
import db from './config/db';
import helpers from './util/hbsHelpers';

const app = express();

const port = process.env.PORT || 8080;

app.use(morgan('combined'));

app.use(cors({ credentials: true, origin: true }));

//config static file
app.use(express.static(__dirname + '/public'));

// parse body
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: helpers,
    })
);
app.set('view engine', 'hbs');
app.set('views', './src/resources/views');

//connect database
db.connect();

route(app);

app.listen(port, () => {
    console.log(`hello world from port ${port} in ${process.env.NODE_ENV} environment`);
});
