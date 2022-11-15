import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';
import { Thing } from '../interfaces/things.js';

export class ThingController {
    constructor(public dataModel: Data<Thing>) {}
    async getAllController(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            res.json(data).end();
        } catch (error) {
            const newError = new HTTPError(
                503,
                'service unavailable',
                (error as Error).message
            );
            next(newError);
            return;
        }
    }
    async getController(req: Request, res: Response, next: NextFunction) {
        // const data = await this.dataModel.get(+req.params.id);
        // //pdte arreglar
        // data = data.filter((item) => item.id === +req.params.id);
        // res.json(data);
        // res.end();
        //try-catch
    }

    async postController(req: Request, res: Response, next: NextFunction) {
        if (!req.body.name) {
            const newError = new HTTPError(
                406,
                'not acceptable',
                'nombre no incluido'
            );
            next(newError);
            return;
        }
        try {
            const newThing = await this.dataModel.post(req.body);
            res.json(newThing).end();
        } catch (error) {
            const newError = new HTTPError(
                503,
                'service unavailable',
                (error as Error).message
            );
            next(newError);
            return;
        }
    }
    async patchController(req: Request, res: Response, next: NextFunction) {
        try {
            const updateThing = await this.dataModel.patch(
                +req.params.id,
                req.body
            );
            res.json(updateThing).end();
        } catch (error) {
            if ((error as Error).message === 'not found it') {
                const newError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(newError);
                return;
            }
            const newError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(newError);
            return;
        }
    }
    async deleteController(req: Request, res: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(+req.params.id);
            res.json({}).end();
        } catch (error) {
            if ((error as Error).message === 'Not found id') {
                const newError = new HTTPError(
                    404,
                    'Not Found',
                    (error as Error).message
                );
                next(newError);
                return;
            }
            const newError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(newError);
            return;
        }
    }
}
