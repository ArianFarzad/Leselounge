import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as JwtPayload;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Token verification failed:', error.message);
    } else {
      console.error('An unknown error occurred during token verification');
    }
    return null;
  }
};
