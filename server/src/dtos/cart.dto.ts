import { z } from 'zod';
import validator from 'validator';
import { Types } from 'mongoose';

export const CART_NAMESPACE = 'Cart';

export const CartDto = z.object({
  quantity: z.number(),
  product: z
    .string()
    .refine(validator.isMongoId)
    .transform((id) => {
      return new Types.ObjectId(id);
    }),
  user: z
    .string()
    .refine(validator.isMongoId)
    .transform((id) => {
      return new Types.ObjectId(id);
    }),
  _id: z
    .string()
    .refine(validator.isMongoId)
    .transform((id) => {
      return new Types.ObjectId(id);
    }),
});

export const AddToCartDto = CartDto.pick({
  product: true,
  quantity: true,
  user: true,
});

export const CartIdIDto = z.object({
  id: z.string().refine(validator.isMongoId),
});

export type CartIdIDto = z.infer<typeof CartIdIDto>;
export type CartDto = z.infer<typeof CartDto>;
export type AddToCartDto = z.infer<typeof AddToCartDto>;
