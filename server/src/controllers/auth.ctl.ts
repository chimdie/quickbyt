import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { successResponder, errorResponder, customErrorHandler } from '@/common/http-responder';
import { JWT_SECRET, JWT_EXPIRATION } from '@/common/config';
import { LoginDto, SignupDto } from '@/dtos/auth.dto';
import { AuthModel } from '@/models/auth.model';
import { UserModel } from '@/models/user.model';

export const signupCtl = async (req: Request<unknown, unknown, SignupDto>, res: Response) => {
  try {
    const { password, confirmPassword, ...userData } = req.body;

    const existingUser = await UserModel.findOne({ username: userData.username });

    if (existingUser) {
      return customErrorHandler(res, { name: 'BAD REQUEST', message: 'User already exists', code: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create(userData);

    await AuthModel.create({
      hash: hashedPassword,
      userId: user._id,
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return successResponder(res, { token, user });
  } catch (error: any) {
    return errorResponder(res, error);
  }
};

export const loginCtl = async (req: Request<unknown, unknown, LoginDto>, res: Response) => {
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
