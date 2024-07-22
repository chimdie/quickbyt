import { Router } from 'express';
import { get_auth_user_ctl, get_user_byId_ctl, get_users_ctl } from '@/controllers/user.ctl';

export const userRouter = Router();

userRouter.get('/me', get_auth_user_ctl);
userRouter.get('/:id', get_user_byId_ctl);
userRouter.get('/', get_users_ctl);
