import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { Exception } from '@/common/errors';
import { errorResponder } from '@/common/http-responder';

type SchemaType<T> = ZodSchema<T>;

export const dto_validator =
  <T>(schema: SchemaType<T>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const dataToValidate = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    const reqResponse = schema.safeParse(dataToValidate);

    if (!reqResponse.success) {
      const errors = reqResponse.error.flatten();
      const errorResponse = Object.entries(errors.fieldErrors).map(([key, value]: [any, any]) => ({
        path: key,
        message: value.length > 1 ? value.join(', ') : value[0],
      }));

      const errorStack = new Exception('VALIDATION_ERROR', 'Validation failed', errorResponse);
      return errorResponder(_res, errorStack);
    }
    req.body = reqResponse.data;
    return next();
  };
