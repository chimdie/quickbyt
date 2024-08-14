import { Router } from 'express';
import { dto_validator } from '@/middleware/dto_validor';
import {
  create_product_ctl,
  get_product_by_id,
  get_products,
  update_product,
} from '@/controllers/product.ctl';
import { create_product_dto } from '@/dtos/product.dto';

export const product_router = Router();

product_router.get('/', get_products);
product_router.post('/', [dto_validator(create_product_dto)], create_product_ctl);
product_router.get('/:id', get_product_by_id);
product_router.put('/:id', update_product);
