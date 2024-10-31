import { Router } from 'express';
import { add_to_cart, get_cart, remove_item } from '@/controllers/cart.ctl';
// import { dto_validator } from '@/middleware/dto_validor';
// import { add_cart_dto } from '@/dtos/cart.dto';

export const cart_router = Router();

cart_router.get('/', get_cart);
cart_router.post('/', add_to_cart);
cart_router.delete('/:id', remove_item);
