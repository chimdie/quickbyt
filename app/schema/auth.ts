import {z} from 'zod';

export const UsernameSchema = z.object({
  username: z
    .string({message: 'Enter your username'})
    .min(3, {message: 'Username must have at least 3 characters'})
    .trim(),
});

export const LoginSchema = z.object({
  username: z
    .string({message: 'Enter your username'})
    .min(3, {message: 'Username must have at least 3 characters'})
    .trim(),
  password: z.string({message: 'Enter your password'}).trim(),
});

export const SignupSchema = z
  .object({
    username: z
      .string({message: 'Enter your username'})
      .min(3, {message: 'Username must have at least 3 characters'})
      .trim(),
    password: z.string({message: 'Enter your password'}).min(8).max(25).trim(),
    confirmPassword: z
      .string({message: 'Confirm that your passwords match'})
      .min(8)
      .max(60)
      .trim(),
  })
  .refine(data => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type UsernameSchema = z.infer<typeof UsernameSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
export type SignupSchema = z.infer<typeof SignupSchema>;
