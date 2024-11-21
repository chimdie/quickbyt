import { Router } from 'express';
import { dto_validator } from '@/middleware/dto_validor';
import { login_ctl, signup_ctl } from '@/controllers/auth.ctl';
import { Login_dto, Signup_dto } from '@/dtos/auth.dto';
import { login_doc, signup_doc } from '@/docs/auth.docs';

export const authRouter = Router();

authRouter.post('/signup', dto_validator(Signup_dto), signup_doc, signup_ctl);
authRouter.post('/login', dto_validator(Login_dto), login_doc, login_ctl);
