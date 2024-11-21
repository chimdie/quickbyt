import { Router } from 'express';
import { oapi } from '@/common/config/docs.config';

export const docsRouter = Router();

docsRouter.use(oapi.swaggerui());
