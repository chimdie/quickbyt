import { JwtPayload } from 'jsonwebtoken';

export interface JWT_PAYLOAD extends JwtPayload {
  id: string;
}
