import { Router, Request, Response } from 'express';
import { authRouter } from './auth.routes';
import { userRouter } from './user.routes';
import { authenticate } from '@/middleware/authenticate';
import { productRouter } from './product.routes';
import { cartRouter } from './cart.routes';
import { oapi } from '@/common/config/docs.config';
import { docsRouter } from './docs.routes';

export const routerV1 = Router();

routerV1.use('/docs', docsRouter);
routerV1.use('/auth', authRouter);
routerV1.use('/users', userRouter);
routerV1.use('/products', [authenticate], productRouter);
routerV1.use('/cart', [authenticate], cartRouter);

routerV1.get(
  '/docs',
  oapi.path({
    summary: '',
    responses: { 200: { description: 'We Live!' } },
  }),
  (_req: Request, res: Response) => {
    return res.json({ message: 'Success' });
  }
);
