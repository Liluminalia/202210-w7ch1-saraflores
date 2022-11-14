import { Router } from 'express';
import { ThingController } from '../controller/thing.controller.js';

export const thingRouter = Router();
const controller = new ThingController();
thingRouter.get('/', controller.getAllController);
thingRouter.get('/:id', controller.getController);
thingRouter.post('/', controller.postController);
thingRouter.patch('/:id', controller.patchController);
thingRouter.delete('/:id', controller.deleteController);
