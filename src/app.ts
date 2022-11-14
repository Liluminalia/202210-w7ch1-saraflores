import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { thingRouter } from './router/things.router.js';

export const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mundo! soy Sara');
    res.end();
});
app.use('/things', thingRouter);
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
