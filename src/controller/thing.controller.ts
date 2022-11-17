import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';
import { Thing } from '../interfaces/things.js';

export class ThingController {
    constructor(public repository: Data<Thing>) {}
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.repository.getAll();
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
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const thing = await this.repository.get(req.params.id);
            res.json({ thing });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }
    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const thing = await this.repository.post(req.body);
            res.json({ thing });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }
    async patch(req: Request, res: Response, next: NextFunction) {
        try {
            const thing = await this.repository.patch(req.params.id, req.body);
            res.json({ thing });
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.repository.delete(req.params.id);
            res.json({});
        } catch (error) {
            next(this.#createHttpError(error as Error));
        }
    }
    #createHttpError(error: Error) {
        if ((error as Error).message === 'Not found id') {
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
