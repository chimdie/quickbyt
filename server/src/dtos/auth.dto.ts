import { z, enum as _enum } from 'zod';
import { User_dto } from '@/dtos/user.dto';

export const Signup_dto = User_dto.pick({
  username: true,
  role: true,
  password: true,
  confirmPassword: true,
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

export type Signup_dto = z.infer<typeof Signup_dto>;

export const Login_dto = User_dto.pick({
  username: true,
  password: true,
});

export type Login_dto = z.infer<typeof Login_dto>;
