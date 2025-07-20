import { Request, Response, NextFunction } from 'express';
import { verifyToken } from "../config/authConfig";

export interface CustomRequest extends Request {
    user?: any; 
}
const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      statusCode: 401,
      message: 'Access denied. No token provided.',
    });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decoded = verifyToken(token);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: 'error',
      statusCode: 401,
      message: 'Invalid token.',
    });
  }
};

export default authMiddleware;