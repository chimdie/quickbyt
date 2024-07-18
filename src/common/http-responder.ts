import { Response } from 'express';
import { Errors, Exception } from './errors';

export function successResponder<T>(
  response: Response,
  payload: T,
  message: string = '',
  context: string = 'ok'
) {
  // ---
  return response.status(200).json({
    isError: false,
    context: context.toLowerCase(),
    message,
    payload,
  });
}

export function errorResponder(response: Response, error: any) {
  // ---

  const e: Errors = {
    name: 'SERVER_ERROR',
    message: error.message ? error.message : String(error),
    cause: error,
    code: error.code || 500,
  };

  if (error instanceof Exception) {
    e.code = error.code;
    e.message = error.message;
  }

  const context: Errors = error?.name?.toLowerCase();

  response.status(e.code).json({
    isError: true,
    description: e.cause,
    message: e.message,
    context,
    payload: null,
  });
}

export function customErrorHandler(
  res: Response,
  err: { name: string; message: string; code: number; context?: string }
) {
  res.status(err.code).json({
    isError: true,
    description: err.name,
    message: err.message,
    context: err.context,
    payload: null,
  });
}
