import { NextFunction, Request, Response } from 'express';
import { describe } from 'node:test';
import { ThingController } from './thing.controller';

describe('Given', () => {
    describe('when', () => {
        test('then ...getAllController', () => {
            const thingController = new ThingController();
            const req = {};
            const res = {
                json: jest.fn(),
                end: jest.fn(),
            };
            thingController.getAllController(
                req as Request,
                res as unknown as Response
            );
            expect(res.json).toHaveBeenCalled();
            expect(res.end).toHaveBeenCalled();
        });
        test('then ...getController', () => {
            const thingController = new ThingController();
            const req = {};
            const res = {
                json: jest.fn(),
                end: jest.fn(),
            };
            thingController.getController(
                req as Request,
                res as unknown as Response
            );
            expect(res.json).toHaveBeenCalled();
            expect(res.end).toHaveBeenCalled();
        });
        test('then ...postController', () => {
            const thingController = new ThingController();
            const req = {};
            const res = {
                json: jest.fn(),
                end: jest.fn(),
            };
            thingController.postController(
                req as Request,
                res as unknown as Response
            );
            expect(res.json).toHaveBeenCalled();
            expect(res.end).toHaveBeenCalled();
        });
        test('then ...patchController', () => {
            const thingController = new ThingController();
            const req = {};
            const res = {
                json: jest.fn(),
                end: jest.fn(),
            };
            thingController.patchController(
                req as Request,
                res as unknown as Response
            );
            expect(res.json).toHaveBeenCalled();
            expect(res.end).toHaveBeenCalled();
        });
        test('then ...deleteController', () => {
            const thingController = new ThingController();
            const req = {};
            const res = {
                json: jest.fn(),
                end: jest.fn(),
            };
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
