import mongoose from 'mongoose';
import { PRODUCT_NAMESPACE, ProductDto } from '@/dtos/product.dto';

const { Schema } = mongoose;

const ProductSchema = new Schema<ProductDto>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['FRUITS', 'VEGETABLES', 'GRAINS', 'MEAT'], required: true },
    image: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model(PRODUCT_NAMESPACE, ProductSchema);
