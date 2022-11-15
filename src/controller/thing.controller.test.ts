import { NextFunction, Request, Response } from 'express';
import { ThingsFileData } from '../data/things.file.data';
import { ThingController } from './thing.controller';

describe('Given', () => {
    describe('when', () => {
        test('then ...getAllController', () => {
            const model = new ThingsFileData();
            const thingController = new ThingController(model);
            const req = {};
            const res = {
                json: jest.fn(),
                end: jest.fn(),
            };
            const next = () => {};

            thingController.getAllController(
                req as Request,
                res as unknown as Response,
                next as NextFunction
            );
            expect(res.json).toHaveBeenCalled();
            expect(res.end).toHaveBeenCalled();
        });
        test('then ...getController', () => {
            const model = new ThingsFileData();

            const thingController = new ThingController(model);
            const req = {};
            const res = {
                json: jest.fn(),
                end: jest.fn(),
            };
            const next = () => {};

            thingController.getController(
                req as Request,
                res as unknown as Response,
                next as NextFunction
            );
            expect(res.json).toHaveBeenCalled();
            expect(res.end).toHaveBeenCalled();
        });
        test('then ...postController', () => {
            const model = new ThingsFileData();

            const thingController = new ThingController(model);
            const req = {};
            const res = {
                json: jest.fn(),
                end: jest.fn(),
            };
            const next = () => {};

            thingController.postController(
                req as Request,
                res as unknown as Response,
                next as NextFunction
            );
            expect(res.json).toHaveBeenCalled();
            expect(res.end).toHaveBeenCalled();
        });
        test('then ...patchController', () => {
            const model = new ThingsFileData();

            const thingController = new ThingController(model);
            const req = {};
            const res = {
                json: jest.fn(),
                end: jest.fn(),
            };
            const next = () => {};

            thingController.patchController(
                req as Request,
                res as unknown as Response,
                next as NextFunction
            );
            expect(res.json).toHaveBeenCalled();
            expect(res.end).toHaveBeenCalled();
        });
        test('then ...deleteController', () => {
            const model = new ThingsFileData();

            const thingController = new ThingController(model);
            const req = {};
            const res = {
                json: jest.fn(),
                end: jest.fn(),
            };
            const next = () => {};
            thingController.deleteController(
                req as Request,
                res as unknown as Response,
                next as NextFunction
            );
            expect(res.json).toHaveBeenCalled();
            expect(res.end).toHaveBeenCalled();
        });
    });
});
