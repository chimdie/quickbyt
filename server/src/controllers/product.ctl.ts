import { Request, Response } from 'express';
import { ProductModel } from '@/models/product.model';
import { CreateProductI, ProductId } from '@/dtos/product.dto';
import { customErrorHandler, errorResponder, successResponder } from '@/common/http-responder';

export const get_products = async (_req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();

    return successResponder(res, products);
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const create_product_ctl = async (req: Request<unknown, unknown, CreateProductI>, res: Response) => {
  try {
    const product = await ProductModel.create(req.body);

    return successResponder(res, product);
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const get_product_by_id = async (req: Request<ProductId>, res: Response) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById({ _id: id }).lean();

    if (!product) {
      return customErrorHandler(res, { code: 404 });
    }

    return successResponder(res, product);
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const update_product = async (req: Request<ProductId, unknown, CreateProductI>, res: Response) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    const product = await ProductModel.findById({ _id: id }).lean();

    if (!product) {
      return customErrorHandler(res, { code: 404 });
    }

    const updatedProduct = await ProductModel.updateOne({ _id: id }, payload, {
      new: true,
      lean: true,
    });

    if (!updatedProduct) {
      return customErrorHandler(res, { code: 500 });
    }

    return successResponder(res, updatedProduct);
  } catch (error) {
    return errorResponder(res, error);
  }
};
