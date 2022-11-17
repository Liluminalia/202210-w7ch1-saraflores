import { NextFunction, Request, Response } from 'express';
import { CoffeeRepository } from '../data/coffee.repository.js';
import { CoffeeController } from './coffee.controller.js';
jest.mock('../data/coffee.repository');
describe('Given CoffeeController', () => {
    describe('When we instantiate getAll()', () => {
        CoffeeRepository.prototype.getAll = jest
            .fn()
            .mockResolvedValue(['mock']);
        CoffeeRepository.prototype.get = jest.fn().mockResolvedValue(['mock']);
        CoffeeRepository.prototype.post = jest.fn().mockResolvedValue(['mock']);
        CoffeeRepository.prototype.patch = jest
            .fn()
            .mockResolvedValue(['mock']);
        CoffeeRepository.prototype.delete = jest
            .fn()
            .mockResolvedValue(['mock']);
        const repository = new CoffeeRepository();
        const coffeeController = new CoffeeController(repository);

        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();
        test('Then getAll should have been called', async () => {
            await coffeeController.getAll(
                req as Request,
                res as Response,
                next
            );
            expect(res.json).toHaveBeenCalledWith({ coffees: ['mock'] });
        });
        test('Then get should have been called', async () => {
            await coffeeController.get(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ coffees: ['mock'] });
        });
        test('Then post should have been called', async () => {
            await coffeeController.post(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ coffees: ['mock'] });
        });
        test('Then patch should have been called', async () => {
            await coffeeController.patch(req as Request, res as Response, next);
            expect(res.json).toHaveBeenCalledWith({ coffees: ['mock'] });
        });
        test('Then delete should have been called', async () => {
            await coffeeController.delete(
                req as Request,
                res as Response,
                next
            );
            expect(res.json).toHaveBeenCalledWith({ coffees: ['mock'] });
        });
    });
});
