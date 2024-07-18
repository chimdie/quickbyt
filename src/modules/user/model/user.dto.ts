import { z, enum as _enum } from 'zod';
import validator from 'validator';
import { Types } from 'mongoose';

export const USER_NAMESPACE: string = 'User';

export const AccountType = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type AccountType = (typeof AccountType)[keyof typeof AccountType];

export const user_dto = z.object({
  username: z
    .string({ required_error: 'Username is required', invalid_type_error: 'Username must be a string' })
    .trim()
    .min(3, 'Username must not be empty'),
  role: _enum([AccountType.USER, AccountType.ADMIN]).default(AccountType.USER),
  isVerified: z.boolean(),
  _id: z
    .string()
    .refine(validator.isMongoId)
    .transform((id) => {
      return new Types.ObjectId(id);
    }),
  password: z.string({
    required_error: 'Password is required',
  }),
  confirmPassword: z.string({
    required_error: 'Confirm password is required',
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserI = z.infer<typeof user_dto>;
