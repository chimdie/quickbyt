import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponder } from '@/common/http-responder';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return errorResponder(res, { code: 401 });
  }

  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.body.user = decoded;
    next();
  } catch (error) {
    return errorResponder(res, error);
  }
};
