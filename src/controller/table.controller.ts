import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';
import { Table } from '../interfaces/tables.js';

export class TableController {
    constructor(public dataModel: Data<Table>) {}
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
        try {
            const data = await this.dataModel.get(+req.params.id);
            res.json(data).end();
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return;
        }
    }

    async postController(req: Request, res: Response, next: NextFunction) {
        if (!req.body.name) {
            const newError = new HTTPError(
                406,
                'not acceptable',
                'not included name'
            );
            next(newError);
            return;
        }
        try {
            const newTable = await this.dataModel.post(req.body);
            res.json(newTable).end();
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
            const updateTable = await this.dataModel.patch(
                +req.params.id,
                req.body
            );
            res.json(updateTable).end();
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return;
        }
    }
    async deleteController(req: Request, res: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(+req.params.id);
            res.json({}).end();
        } catch (error) {
            next(this.#createHttpError(error as Error));
            return;
        }
    }
    #createHttpError(error: Error) {
        if (error.message === 'Not found id') {
            const httpError = new HTTPError(404, 'Not Found', error.message);
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            error.message
        );
        return httpError;
    }
}
