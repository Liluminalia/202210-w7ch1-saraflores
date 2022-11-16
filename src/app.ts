import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { thingRouter } from './router/things.router.js';
import { tableRouter } from './router/tables.router.js';

export const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(
        'API de Things y Tables, pon /things o /tables al final de la URL'
    );
    res.end();
});
app.use('/things', thingRouter);
app.use('/tables', tableRouter);
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    let status = 500;
    if (err.name === 'ValidationError') {
        status = 406;
    } else {
        //
    }
    res.status(status);
    const result = {
        status: status,
        type: err.name,
        error: err.message,
    };
    res.json(result);
    res.end();
});
