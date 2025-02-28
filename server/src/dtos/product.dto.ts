import { z } from 'zod';
import validator from 'validator';
import { Types } from 'mongoose';

export const PRODUCT_NAMESPACE: string = 'Product';

// TODO: To be updated
export const product_category = ['fruits', 'vegetables', 'grains', 'meat', 'seafood'] as const;

export const ProductDto = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string(),
  category: z.enum(['FRUITS', 'VEGETABLES', 'GRAINS', 'MEAT']),
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

export type ProductDto = z.infer<typeof ProductDto>;

export const CreateProductDto = ProductDto.pick({
  name: true,
  price: true,
  description: true,
  category: true,
});

export type CreateProductDto = z.infer<typeof CreateProductDto>;

export const ProductIdDto = z.object({
  id: z.string().refine(validator.isMongoId),
});

export type ProductIdDto = z.infer<typeof ProductIdDto>;

export const UpdateProductDto = ProductDto.partial();
export type UpdateProductDto = z.infer<typeof UpdateProductDto>;
