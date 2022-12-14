import { Router } from 'express';
import { ThingController } from '../controller/thing.controller.js';
import { ThingsFileData } from '../data/things.file.data.js';

export const thingRouter = Router();
const controller = new ThingController(new ThingsFileData());
thingRouter.get('/', controller.getAll.bind(controller));
thingRouter.get('/:id', controller.get.bind(controller));
thingRouter.post('/', controller.post.bind(controller));
thingRouter.patch('/:id', controller.patch.bind(controller));
thingRouter.delete('/:id', controller.delete.bind(controller));
