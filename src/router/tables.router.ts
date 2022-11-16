import { Router } from 'express';
import { TableController } from '../controller/table.controller';
import { TableMongoData } from '../data/tables.mongo.data';

export const tableRouter = Router();
const controller = new TableController(new TableMongoData());
tableRouter.get('/', controller.getAllController.bind(controller));
tableRouter.get('/:id', controller.getController.bind(controller));
tableRouter.post('/', controller.postController.bind(controller));
tableRouter.patch('/:id', controller.patchController.bind(controller));
tableRouter.delete('/:id', controller.deleteController.bind(controller));
