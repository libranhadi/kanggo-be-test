import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../helper/errorHandler';
import { successResponse } from '../helper/successHandler';
import User from '../model/User';
import { AuthService } from '../service/authService';
import { body, validationResult } from 'express-validator';


export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public validateRegister() {
    return [
      body('email')
        .isEmail()
        .withMessage('Valid email is required')
        .normalizeEmail(),
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .trim(),
    ];
  }

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(400, errors.array()[0].msg);
      }

      const userData: Partial<typeof User> = req.body;
      const user = await this.authService.register(userData);
      successResponse(res, user, 'User registered successfully', 201);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        next(error);
      } else {
        next(new ErrorHandler(500, 'An unknown error occurred'));
      }
    }
  };

  public validateLogin() {
    return [
      body('email').isEmail().withMessage('Valid email is required'),
      body('password').exists().withMessage('Password is required'),
    ];
  }

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(400, errors.array()[0].msg);
      }

      const { email, password } = req.body;
      const resp = await this.authService.login(email, password);
      successResponse(res, resp, 'User logged in successfully', 200);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        next(error);
      } else {
        next(new ErrorHandler(500, 'An unknown error occurred'));
      }
    }
  };
}