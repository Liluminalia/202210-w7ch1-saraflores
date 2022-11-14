import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { Thing } from '../interfaces/things.js';
const dataFile = process.env.DATA_FILE || '';
const importData = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
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
