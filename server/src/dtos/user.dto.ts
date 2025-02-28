import { z } from 'zod';
import validator from 'validator';

export const USER_NAMESPACE: string = 'User';

export const AccountType = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type AccountType = (typeof AccountType)[keyof typeof AccountType];

export const User = z.object({
  username: z
    .string({ required_error: 'Username is required', invalid_type_error: 'Username must be a string' })
    .trim()
    .min(3, 'Username must not be empty'),
  role: z.union([z.literal(AccountType.USER), z.literal(AccountType.ADMIN)]),
  isVerified: z.boolean(),
  _id: z.string().refine(validator.isMongoId),
  password: z.string({
    required_error: 'Password is required',
  }),
  confirmPassword: z.string({
    required_error: 'Confirm password is required',
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
  }),
});

export type User = z.infer<typeof User>;

export const UserDto = User.omit({
  password: true,
  confirmPassword: true,
});

export type UserDto = z.infer<typeof UserDto>;

export const UserIdDto = z.object({
  id: z.string().refine(validator.isMongoId),
});

export type UserIdDto = z.infer<typeof UserIdDto>;

export const UsernameDto = User.pick({
  username: true,
});

export type UsernameDto = z.infer<typeof UsernameDto>;
