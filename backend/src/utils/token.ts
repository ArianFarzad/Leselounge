import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT_SECRET environment variable is not set');
}

interface CustomJwtPayload extends jwt.JwtPayload {
  userId: string;
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => { 
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ error: 'No token, authorization denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as CustomJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'error.session_expired' });
    } else {
      res.status(401).json({ error: 'error.invalid_token' });
    }
    return;
  }
};
