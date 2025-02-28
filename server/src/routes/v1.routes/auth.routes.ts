import { Router } from 'express';
import { validator } from '@/middleware/dto_validor';
import { loginCtl, signupCtl } from '@/controllers/auth.ctl';
import { LoginDto, SignupDto } from '@/dtos/auth.dto';
import { login_doc, signup_doc } from '@/docs/auth.docs';

export const authRouter = Router();

authRouter.post('/login', validator({ body: LoginDto }), login_doc, loginCtl);
authRouter.post('/signup', validator({ body: SignupDto }), signup_doc, signupCtl);
