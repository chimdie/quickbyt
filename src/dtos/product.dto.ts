import { z } from 'zod';
import validator from 'validator';
import { Types } from 'mongoose';

export const PRODUCT_NAMESPACE: string = 'Product';

// TODO: To be updated
export const product_category = ['fruits', 'vegetables', 'grains', 'meat', 'seafood'] as const;

export const product_dto = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
  category: z.enum(product_category),
  createdAt: z.string(),
  updatedAt: z.string(),
  image: z.string(),
  isAvailable: z.boolean().default(true),
  _id: z
    .string()
    .refine(validator.isMongoId)
    .transform((id) => {
      return new Types.ObjectId(id);
    }),
});

export type ProductI = z.infer<typeof product_dto>;

export const create_product_dto = product_dto.pick({
  name: true,
  price: true,
  description: true,
  category: true,
});

export type CreateProductI = z.infer<typeof create_product_dto>;

export const product_id_dto = z
  .string()
  .refine(validator.isMongoId)
  .transform((id) => {
    console.log({ id });
    return new Types.ObjectId(id);
  });

export type ProductId = z.infer<typeof product_id_dto>;
