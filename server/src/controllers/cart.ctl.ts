import { Request, Response } from 'express';
import { customErrorHandler, errorResponder, successResponder } from '@/common/http-responder';
import { CartModel } from '@/models/cart.model';
import { AddCartI, CartI, CartIdI } from '@/dtos/cart.dto';

export const get_cart = async (req: Request<CartI>, res: Response) => {
  try {
    let userId = req.user?._id;

    let cart = await CartModel.find({ user: userId }).populate('product').lean();

    return successResponder(res, cart);
  } catch (error) {
    return errorResponder(res, error);
  }
};

export const add_to_cart = async (req: Request<unknown, unknown, AddCartI>, res: Response) => {
  const { product, quantity } = req.body;
  const userId = req.user?._id;

  const cart = await CartModel.findOneAndUpdate(
    { product, user: userId },
    { $inc: { quantity: quantity }, product, user: userId },
    { upsert: true, new: true }
  );

  return successResponder(res, cart);
};

export const remove_item = async (req: Request<CartIdI>, res: Response) => {
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
