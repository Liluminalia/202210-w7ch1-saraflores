import { NextFunction, Request, Response } from 'express';
import { DataUser } from '../data/data.js';
import { ProtoUser, User } from '../entities/user.js';
import { HTTPError } from '../interfaces/error.js';

export class UserController {
    constructor(public repository: DataUser<User>) {
        //
    }

    async post(req: Request, resp: Response, next: NextFunction) {
        try {
            const user = await this.repository.post(req.body);
            resp.json({ user });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
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
