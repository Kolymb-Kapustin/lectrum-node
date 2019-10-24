// Core
import express from 'express';
import bodyParser from 'body-parser';

//Routers
import * as routers from './routers';

import { logger } from './utils';

const app = express();

app.use(bodyParser.json({ limit: '10kb' }));

// Logger
if(process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        logger.debug({
            message: {
                method: req.method,
                payload: req.body
            }
        });
        next();
    });
}

// Routers
app.use('/auth', routers.auth);
app.use('/users', routers.users);
app.use('/classes', routers.classes);
app.use('/lessons', routers.lessons);
app.use('/login', routers.login);
app.use('/logout', routers.logout);

export { app };
