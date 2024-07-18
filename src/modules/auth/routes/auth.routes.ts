import { Router } from 'express';
import { dto_validator } from '@/middleware/dto_validor';
import { login_ctl, signup_ctl } from '../controller/auth.controller';
import { login_dto, signup_dto } from '../model/auth.dto';

export const authRouter = Router();

authRouter.post('/signup', dto_validator(signup_dto), signup_ctl);
authRouter.post('/login', dto_validator(login_dto), login_ctl);
