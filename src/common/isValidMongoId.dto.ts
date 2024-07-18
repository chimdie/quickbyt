import { z } from 'zod';
import mongoose from 'mongoose';

export const isValidMongoIdDTO = z.string().refine((value) => {
  try {
    new mongoose.Types.ObjectId(value);
    return true;
  } catch (error) {
    return false;
  }
}, 'Invalid Id');
