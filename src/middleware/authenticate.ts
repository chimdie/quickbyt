import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponder } from '@/common/http-responder';
import { UserModel } from '@/models/user.model';
import { JWT_PAYLOAD } from '@/common/config/types';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return errorResponder(res, { code: 401 });
  }

  const token = authorization.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JWT_PAYLOAD;
    if (!payload) {
      return errorResponder(res, 'Invalid user Authentication');
    }

    const user = await UserModel.findById(payload?.id).lean();

    if (!user) {
      return errorResponder(res, 'Invalid user Authentication');
    }

    req.user = user;

    next();
  } catch (error) {
    return errorResponder(res, error);
  }
};
