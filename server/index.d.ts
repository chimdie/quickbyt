import { User_dto } from '@/dtos/user.dto';

declare global {
  namespace Express {
    interface Request {
      user?: User_dto;
    }
  }
}
