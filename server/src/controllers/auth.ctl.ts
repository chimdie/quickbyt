import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { successResponder, errorResponder, customErrorHandler } from '@/common/http-responder';
import { JWT_SECRET, JWT_EXPIRATION } from '@/common/config';
import { Login_dto, Signup_dto } from '@/dtos/auth.dto';
import { AuthModel } from '@/models/auth.model';
import { UserModel } from '@/models/user.model';

export const signup_ctl = async (req: Request<unknown, unknown, Signup_dto>, res: Response) => {
  try {
    const { password, confirmPassword, ...userData } = req.body;

    const user = await UserModel.findOne({ username: userData.username });

    if (user) {
      return customErrorHandler(res, { name: 'BAD REQUEST', message: 'User already exists', code: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const resource = await UserModel.create(userData);

    await AuthModel.create({
      hash: hashedPassword,
      userId: resource._id,
    });

    const token = jwt.sign({ id: resource._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return successResponder(res, { token, resource });
  } catch (error: any) {
    return errorResponder(res, error);
  }
};

export const login_ctl = async (req: Request<unknown, unknown, Login_dto>, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username: username }).lean();

    if (!user) {
      return customErrorHandler(res, { name: 'BAD REQUEST', message: 'User not found', code: 400 });
    }
    console.log('HIT', password, user);

    const authDetails = await AuthModel.findOne({ userId: user._id }).lean();

    if (!authDetails) {
      return errorResponder(res, { name: 'SERVER ERROR', message: 'Something went wrong', code: 500 });
    }

    const isPasswordValid = await bcrypt.compare(password, authDetails.hash);

    if (!isPasswordValid) {
      return customErrorHandler(res, { name: 'BAD REQUEST', message: 'Passwords does not match', code: 400 });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    return successResponder(res, { token, user });
  } catch (error: any) {
    return errorResponder(res, error);
  }
};
