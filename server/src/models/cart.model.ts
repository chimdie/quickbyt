import mongoose from 'mongoose';
import { CART_NAMESPACE, CartDto } from '@/dtos/cart.dto';
import { PRODUCT_NAMESPACE } from '@/dtos/product.dto';
import { USER_NAMESPACE } from '@/dtos/user.dto';

const { Schema } = mongoose;

const CartSchema = new Schema<CartDto>(
  {
    quantity: { type: Number, required: true, default: 1 },
    product: { type: Schema.Types.ObjectId, required: true, ref: PRODUCT_NAMESPACE },
    user: { type: Schema.Types.ObjectId, required: true, ref: USER_NAMESPACE },
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model(CART_NAMESPACE, CartSchema);
