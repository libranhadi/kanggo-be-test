// src/service/authService.ts
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../helper/errorHandler';
import { generateToken } from '../config/authConfig';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../model/User';

export class AuthService {
  constructor(private userRepository: typeof UserRepository) {}

  public async register(userData: User): Promise<{ email: string }> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ErrorHandler(400, 'Email already exists.');
    }

    const user = await this.userRepository.create(userData);
    
    return {
      email: user.email
    };
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user == null) {
      throw new ErrorHandler(401, "The email you entered is not registered.");
    }

    const isPasswordValid = await this.userRepository.validatePassword(user, password);
    if (!isPasswordValid) {
      throw new ErrorHandler(401, 'Incorrect password. Please try again');
    }

    return generateToken(user.id?.toString());
  }
}