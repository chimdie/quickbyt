import {z} from 'zod';

export const ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export const SignupSchema = z
  .object({
    username: z.string({message: 'Provide your email address'}).trim(),
    password: z.string().min(8).max(60).trim(),
    confirmPassword: z.string().min(8).max(60).trim(),
    role: z.enum([ROLE.ADMIN, ROLE.USER]),
  })
  .refine(data => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const LoginSchema = z.object({
  username: z.string({message: 'Provide your email address'}).trim(),
  password: z.string().min(8).max(60).trim(),
});

export type SignupSchema = z.infer<typeof SignupSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
