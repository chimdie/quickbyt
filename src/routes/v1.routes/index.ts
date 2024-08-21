import { Router } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { authenticate } from '@/middleware/authenticate';
import { product_router } from './product.routes';

export const routerV1 = Router();

routerV1.use('/auth', authRouter);
routerV1.use('/users', userRouter);
routerV1.use('/products', [authenticate], product_router);
