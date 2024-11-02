import mongoose from 'mongoose';
import { UserI, AccountType, USER_NAMESPACE } from '@/dtos/user.dto';

const { Schema } = mongoose;

const UserSchema = new Schema<UserI>(
  {
    username: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: [AccountType.USER, AccountType.ADMIN],
      default: AccountType.USER,
    },
    isVerified: { type: Boolean, default: false },
    address: {
      street: { type: String, default: null },
      city: { type: String, default: null },
      state: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model(USER_NAMESPACE, UserSchema);
