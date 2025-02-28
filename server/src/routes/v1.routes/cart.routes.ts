import { Router } from 'express';
import { addToCartCtl, getCartCtl, removeItemCtl } from '@/controllers/cart.ctl';
import { validator } from '@/middleware/dto_validor';
import { AddToCartDto, CartDto, CartIdIDto } from '@/dtos/cart.dto';
import { addToCartDocs, getCartsDocs, removeItemFromCartDocs } from '@/docs/cart.docs';

export const cartRouter = Router();

cartRouter.get('/', validator({ params: CartDto }), getCartsDocs, getCartCtl);
cartRouter.post('/', validator({ body: AddToCartDto }), addToCartDocs, addToCartCtl);
cartRouter.delete('/:id', validator({ params: CartIdIDto }), removeItemFromCartDocs, removeItemCtl);
