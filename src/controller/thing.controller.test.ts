import { NextFunction, Request, Response } from 'express';
import { TableMongoData } from '../data/tables.mongo.data.js';
import { TableController } from './table.controller.js';

jest.mock('../data/tables.mongo.data');
describe('Given TablesController', () => {
    describe('When we instantiate getAll()', () => {
        TableMongoData.prototype.getAll = jest.fn().mockResolvedValue(['mock']);
        TableMongoData.prototype.get = jest.fn().mockResolvedValue(['mock']);
        TableMongoData.prototype.post = jest.fn().mockResolvedValue(['mock']);
        TableMongoData.prototype.patch = jest.fn().mockResolvedValue(['mock']);
        TableMongoData.prototype.delete = jest.fn().mockResolvedValue(['mock']);
        const tableController = new TableController(new TableMongoData());

        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();
        test('Then getAll should have been called', async () => {
            await tableController.getAll(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ tables: ['mock'] });
        });
        test('Then get should have been called', async () => {
            await tableController.get(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ tables: ['mock'] });
        });
        test('Then post should have been called', async () => {
            await tableController.post(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ tables: ['mock'] });
        });
        test('Then patch should have been called', async () => {
            await tableController.patch(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ tables: ['mock'] });
        });
        test('Then delete should have been called', async () => {
            await tableController.delete(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ tables: ['mock'] });
        });
    });
});
