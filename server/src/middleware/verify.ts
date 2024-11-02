import { errorResponder } from '@/common/http-responder';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return errorResponder(res, { code: 403 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.user = decoded;
  } catch (err) {
    return errorResponder(res, { code: 401 });
  }

  return next();
};
