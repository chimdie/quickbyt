import { z, enum as _enum } from 'zod';
import { user_dto } from '@/dtos/user.dto';

export const signup_dto = user_dto
  .pick({
    username: true,
    role: true,
    password: true,
    confirmPassword: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type SignUser = z.infer<typeof signup_dto>;

export const login_dto = user_dto.pick({
  username: true,
  password: true,
});

export type LoginUser = z.infer<typeof login_dto>;
