import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponder } from '@/common/http-responder';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.user = decoded;
    next();
  } catch (error) {
    return errorResponder(res, error);
  }
};

// const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid token' });
//     req.body.user = user;
//     next();
//   });
// };
