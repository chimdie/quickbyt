import { z } from 'zod';
import validator from 'validator';
import { Types } from 'mongoose';

export const CART_NAMESPACE = 'Cart';

export const cart_dto = z.object({
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

export const add_cart_dto = cart_dto.pick({
  product: true,
  quantity: true,
  user: true,
});

export const cart_id_dto = z
  .string()
  .refine(validator.isMongoId)
  .transform((id) => {
    return new Types.ObjectId(id);
  });

export type CartIdI = z.infer<typeof cart_id_dto>;
export type CartI = z.infer<typeof cart_dto>;
export type AddCartI = z.infer<typeof add_cart_dto>;
