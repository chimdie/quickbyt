import { Request, Response } from 'express';
import { customErrorHandler, errorResponder, successResponder } from '@/common/http-responder';
import { CartModel } from '@/models/cart.model';
import { AddToCartDto, CartIdIDto } from '@/dtos/cart.dto';

export const getCartCtl = async (req: Request, res: Response) => {
  try {
    let userId = req.user?._id;

    let cart = await CartModel.find({ user: userId }).populate('product').lean();

    return successResponder(res, cart);
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const addToCartCtl = async (req: Request<unknown, unknown, AddToCartDto>, res: Response) => {
  const { product, quantity } = req.body;
  const userId = req.user?._id;

  const cart = await CartModel.findOneAndUpdate(
    { product, user: userId },
    { $inc: { quantity: quantity }, product, user: userId },
    { upsert: true, new: true }
  );

  return successResponder(res, cart);
};

export const removeItemCtl = async (req: Request<CartIdIDto>, res: Response) => {
  try {
    const { id } = req.params;

    const result = await CartModel.deleteOne({ _id: id });

    if (!result) {
      return customErrorHandler(res, { code: 500 });
    }

    return successResponder(res, result);
  } catch (error) {
    return errorResponder(res, error);
  }
};
