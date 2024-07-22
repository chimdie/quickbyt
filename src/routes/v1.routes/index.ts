import { Router } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { authenticate } from '@/middleware/authenticate';

export const routerV1 = Router();

routerV1.use('/auth', authRouter);
routerV1.use('/users', [authenticate], userRouter);
