import { Request, Response, NextFunction } from 'express';
import { errorResponder } from '@/common/http-responder';
import { AccountType, User } from '@/dtos/user.dto';

export const authorize_admin = (req: Request<unknown, unknown, User>, res: Response, next: NextFunction) => {
  const { role } = req.body;

  if (role !== AccountType.ADMIN) {
    return errorResponder(res, { code: 403 });
  }
  return next();
};
