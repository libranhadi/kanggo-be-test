import { JwtPayload } from 'jsonwebtoken';

export interface CustomJwtPayload extends JwtPayload {
  fullname: string;
  email: string;
  role: string;  
}