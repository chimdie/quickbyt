import { Router } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { authenticate } from '@/middleware/authenticate';
import { product_router } from './product.routes';
import { authorize_admin } from '@/middleware/auth.admin';

export const routerV1 = Router();

routerV1.use('/auth', authRouter);
routerV1.use('/users', authenticate, authorize_admin, userRouter);
routerV1.use('/products', [authenticate], product_router);
