import { NextFunction, Request, Response } from 'express';
import importData from '../db.json' assert { type: 'json' };
// import fs from 'fs/promises'
import { Thing } from '../interfaces/things.js';
let data: Array<Thing> = importData.things;

export class ThingController {
    getAllController = (req: Request, res: Response) => {
        res.json(data);
        res.end();
    };
    getController = (req: Request, res: Response) => {
        data = data.filter((item) => item.id === +req.params.id);
        res.json(data);
        res.end();
    };

    postController = (req: Request, res: Response) => {
        const newThing = {
            ...req.body,
            id: data.length + 1,
        };
        data.push(newThing);
        req.body;
        res.json(newThing);
        res.end();
    };
    patchController = (req: Request, res: Response) => {
        const updatedThing = {
            ...data.find((item) => {
                item.id === +req.params.id;
            }),
            ...req.body,
        };
        data[data.findIndex((item) => item.id === +req.params.id)] =
            updatedThing;
        res.json(updatedThing);
        res.end();
    };
    deleteController = (req: Request, res: Response, next: NextFunction) => {
        if (data.find((item) => item.id !== +req.params.id)) {
            next(new Error('Not Found'));
            return;
        }
        req.params.id;
        data = data.filter((item) => item.id !== +req.params.id);
        res.json({});
        res.end();
    };
}
