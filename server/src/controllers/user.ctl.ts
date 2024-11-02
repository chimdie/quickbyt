import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserI, UserId } from '@/dtos/user.dto';
import { UserModel } from '@/models/user.model';
import { customErrorHandler, errorResponder, successResponder } from '@/common/http-responder';
import { JWT_SECRET } from '@/common/config';

export const get_users_ctl = async (_req: Request<unknown, unknown, UserI[]>, res: Response) => {
  try {
    const users = await UserModel.find();

    return successResponder(res, { users });
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const get_user_by_id_ctl = async (req: Request<UserId>, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById({ _id: id }).lean();

    if (!user) {
      return errorResponder(res, { name: 'NOT_FOUND', code: 404, message: 'User not found' });
    }

    return successResponder(res, { user });
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const get_auth_user_ctl = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return customErrorHandler(res, {
        code: 401,
        name: 'AUTHENTICATION_ERROR',
        message: 'Invalid authentication credentials',
      });
    }

    const token = authorization.split(' ')[1];

    try {
      const decodedUser: any = jwt.verify(token, JWT_SECRET);
      const userId = decodedUser.id;

      const user = await UserModel.findById(userId).lean();

      if (!user) {
        return errorResponder(res, { name: 'NOT_FOUND', code: 404, message: 'User not found' });
      }

      return successResponder(res, { user });
    } catch (error) {
      return errorResponder(res, { name: 'AUTHENTICATION_ERROR', code: 401, message: 'Invalid token' });
    }
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const get_by_username = async (req: Request<Pick<UserI, 'username'>>, res: Response) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username }).lean();

    if (!user) {
      return customErrorHandler(res, { code: 404, message: 'Username does not exist' });
    }

    return successResponder(res, user);
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const check_available_username = async (req: Request<Pick<UserI, 'username'>>, res: Response) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username }).lean();

    if (user) {
      return customErrorHandler(res, { code: 409, message: 'Username is already in use' });
    }

    return successResponder(res, { code: 200, message: 'Username is available' });
  } catch (error) {
    return errorResponder(res, error);
  }
};
