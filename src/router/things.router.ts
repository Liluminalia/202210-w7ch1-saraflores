import { Router } from 'express';
import { ThingController } from '../controller/thing.controller.js';
import { ThingsFileData } from '../data/things.file.data.js';

export const thingRouter = Router();
const controller = new ThingController(new ThingsFileData());
thingRouter.get('/', controller.getAllController.bind(controller));
thingRouter.get('/:id', controller.getController.bind(controller));
thingRouter.post('/', controller.postController.bind(controller));
thingRouter.patch('/:id', controller.patchController.bind(controller));
thingRouter.delete('/:id', controller.deleteController.bind(controller));
