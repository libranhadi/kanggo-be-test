import { CustomJwtPayload } from './auth';

declare global {
  namespace Express {
    interface Request {
      user?: string | CustomJwtPayload; 
    }
  }
}
