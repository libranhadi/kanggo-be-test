import * as jwt from 'jsonwebtoken';
require('dotenv').config();

interface JwtPayload {
  userId: any;
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret'; 

export const generateToken = (userId:string) => {
  return jwt.sign({userId}, JWT_SECRET, { expiresIn: 30});
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};