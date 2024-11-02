import express, { Express, NextFunction, Request, Response } from 'express';
import { routerV1 } from '@/routes/v1.routes';
import { Errors } from '@/common/errors';
import { errorResponder, customErrorHandler } from '@/common/http-responder';

export function server(app: Express) {
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_request: Request, response: Response) => {
    response.status(200).json({ status: 'ok' });
  });

  app.use('/v1', routerV1);

  app.use('*', (_request: Request, response: Response) => {
    return customErrorHandler(response, { name: 'BAD REQUEST', message: 'Invalid route', code: 404 });
  });

  app.use((error: Errors | any, _request: Request, response: Response, _next: NextFunction) => {
    console.error(error, '>>> error');

    return errorResponder(response, error);
  });

  return app;
}
