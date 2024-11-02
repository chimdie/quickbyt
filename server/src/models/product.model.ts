import mongoose from 'mongoose';
import { PRODUCT_NAMESPACE, ProductI, product_category } from '@/dtos/product.dto';

const { Schema } = mongoose;

const ProductSchema = new Schema<ProductI>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: product_category, required: true },
    image: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model(PRODUCT_NAMESPACE, ProductSchema);
