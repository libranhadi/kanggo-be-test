import { UserRepository } from '../repository/userRepository';
import User from '../model/User';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../helper/errorHandler';
import { generateToken } from '../config/authConfig';

export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async register(userData : Partial<User>): Promise <Partial<User>> {
    try {
      const existingUser = await this.userRepository.findByEmail(userData.email!);
      if (existingUser) {
       throw new ErrorHandler(400, 'Email already exists.');
      }
      const user = await this.userRepository.create(userData);
      await user.setPassword(userData.password!);
      await user.save();  
      const returnObj = {
        user : {
          "email" :  user.email
        }
      } as Partial<User>
      return returnObj;
    } catch (error) {
      throw error;
    }
  }

  public async login(email: string, password: string): Promise<String> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ErrorHandler(401, "The email you entered is not registered. Please check your spelling and try again.");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new ErrorHandler(401, 'Incorrect password. Please try again');
    }

   return generateToken(user.id.toString())
  }
}
