import { Request, Response } from 'express';
import { ProductModel } from '@/models/product.model';
import { CreateProductDto, ProductDto, ProductIdDto, UpdateProductDto } from '@/dtos/product.dto';
import { customErrorHandler, errorResponder, successResponder } from '@/common/http-responder';

export const getProductsCtl = async (_req: Request, res: Response<ProductDto[]>) => {
  try {
    const products = await ProductModel.find();

    return successResponder(res, products);
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const createProductCtl = async (req: Request<unknown, unknown, CreateProductDto>, res: Response) => {
  try {
    const product = await ProductModel.create(req.body);

    return successResponder(res, product);
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const getProductByIdCtl = async (req: Request<ProductIdDto>, res: Response) => {
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

export const updateProductCtl = async (
  req: Request<ProductIdDto, unknown, UpdateProductDto>,
  res: Response
) => {
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
