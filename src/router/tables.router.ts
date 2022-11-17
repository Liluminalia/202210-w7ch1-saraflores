import { Router } from 'express';
import { TableController } from '../controller/table.controller.js';
import { TableMongoData } from '../data/tables.mongo.data.js';

export const tableRouter = Router();
const controller = new TableController(new TableMongoData());
tableRouter.get('/', controller.getAll.bind(controller));
tableRouter.get('/:id', controller.get.bind(controller));
tableRouter.post('/', controller.post.bind(controller));
tableRouter.patch('/:id', controller.patch.bind(controller));
tableRouter.delete('/:id', controller.delete.bind(controller));
