import { Router } from 'express';
import {
  get_auth_user_ctl,
  get_user_by_id_ctl,
  get_users_ctl,
  get_by_username,
  check_available_username,
} from '@/controllers/user.ctl';

export const userRouter = Router();

userRouter.get('/username/:username', get_by_username);
userRouter.get('/username/check/:username', check_available_username);
userRouter.get('/me', get_auth_user_ctl);
userRouter.get('/:id', get_user_by_id_ctl);
userRouter.get('/', get_users_ctl);
