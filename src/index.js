import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

//map .env into environment variables (async => import before other file that use env var)
import 'dotenv/config';

import route from './api/v1/routers';
import './api/v1/helpers/cache.helper';
import db from './config/db/connect.config';

const app = express();

const port = process.env.PORT || 8080;

app.use(morgan('combined'));

app.use(cors({ credentials: true, origin: true }));

// parse body
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//connect database
db.connect();

route(app);

app.listen(port, () => {
    console.log(`hello world from port ${port} in ${process.env.NODE_ENV} environment`);
});
