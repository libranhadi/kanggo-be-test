import * as jwt from 'jsonwebtoken';
require('dotenv').config();
import {User} from '../model/User';


interface JwtPayload {
  userId: any;
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret'; 

export const generateTokenJwt = (user: User) => {
  const data = {
    fullname: user.fullname,
    email: user.email,
    role: user.role 
  };

  return jwt.sign(data, JWT_SECRET, { expiresIn: '1h'});
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};