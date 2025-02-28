import { z, enum as _enum } from 'zod';
import { User } from '@/dtos/user.dto';

export const SignupDto = User.pick({
  username: true,
  role: true,
  password: true,
  confirmPassword: true,
});

export type SignupDto = z.infer<typeof SignupDto>;

export const LoginDto = User.pick({
  username: true,
  password: true,
});

export type LoginDto = z.infer<typeof LoginDto>;
