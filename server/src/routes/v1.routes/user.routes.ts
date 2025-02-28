import { Router } from 'express';
import {
  getAuthUserCtl,
  getUserByIdCtl,
  getUsersCtl,
  getByUsername,
  checkAvailableUsername,
} from '@/controllers/user.ctl';
import { validator } from '@/middleware/dto_validor';
import { UserIdDto, UsernameDto } from '@/dtos/user.dto';
import { getUsernameDocs, getUsersDocs, getUserByIdDoc, getUserProfileDoc } from '@/docs/user.docs';

export const userRouter = Router();

userRouter.get('/', getUsersDocs, getUsersCtl);
userRouter.get('/username/:username', validator({ params: UsernameDto }), getUsernameDocs, getByUsername);
userRouter.get(
  '/username/check/:username',
  validator({ params: UsernameDto }),
  getUsernameDocs,
  checkAvailableUsername
);
userRouter.get('/me', getUserProfileDoc, getAuthUserCtl);
userRouter.get('/:id', validator({ params: UserIdDto }), getUserByIdDoc, getUserByIdCtl);
