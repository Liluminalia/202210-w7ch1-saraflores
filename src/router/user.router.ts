import { Router } from 'express';
import { UserController } from '../controller/user.controller.js';
import { UserRepository } from '../data/user.repository.js';

export const userRouter = Router();

const controller = new UserController(new UserRepository());

userRouter.post('/', controller.post.bind(controller));
