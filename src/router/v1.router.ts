import { Express } from 'express';
import { authRouter } from '@/modules/auth/routes/auth.routes';

const routerV1 = (expressInstance: Express) => {
  expressInstance.use('/auth', authRouter);
};

export default routerV1;
