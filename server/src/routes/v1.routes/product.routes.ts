import { Router } from 'express';
import { validator } from '@/middleware/dto_validor';
import {
  createProductCtl,
  getProductByIdCtl,
  getProductsCtl,
  updateProductCtl,
} from '@/controllers/product.ctl';
import { CreateProductDto, ProductIdDto, UpdateProductDto } from '@/dtos/product.dto';
import { getProductByIdDoc, getProductsDocs, productDocs, updateProductDoc } from '@/docs/product.docs';

export const productRouter = Router();

productRouter.get('/', getProductsDocs, getProductsCtl);
productRouter.post('/', validator({ body: CreateProductDto }), productDocs, createProductCtl);
productRouter.get('/:id', validator({ params: ProductIdDto }), getProductByIdDoc, getProductByIdCtl);
productRouter.put(
  '/:id',
  validator({ params: ProductIdDto, body: UpdateProductDto }),
  updateProductDoc,
  updateProductCtl
);
