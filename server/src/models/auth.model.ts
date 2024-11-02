import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

const AuthSchema = new Schema<{
  userId: Types.ObjectId;
  hash: string;
}>({
  userId: Schema.Types.ObjectId,
  hash: String,
});

export const AuthModel = mongoose.model('AUTH', AuthSchema);
