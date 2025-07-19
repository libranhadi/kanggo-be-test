// src/service/authService.ts
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../helper/errorHandler';
import UserRepository from '../repositories/userRepository';
import RoleRepository from '../repositories/roleRepository';
import { User } from '../model/User';

export class AuthService {
  constructor(private userRepository: UserRepository, private roleRepository: RoleRepository) {}

  public async register(userData: User): Promise<User> {
    try {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new ErrorHandler(400, 'Email already exists.');
      }

      const role = await this.roleRepository.findByName(userData.role);
      if (!role) {
        throw new ErrorHandler(404, 'Role not found.');
      }

      userData.role_id = role.id;
      const user = await this.userRepository.create(userData);
      user.role = role.name

      return user;
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw error; 
      }

      throw new ErrorHandler(500, 'Something went wrong during registration.');
    }
  }

 public async login(email: string, password: string): Promise<User> {
  try {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ErrorHandler(401, "The email you entered is not registered.");
    }

    const isPasswordValid = await this.userRepository.validatePassword(user, password);
    if (!isPasswordValid) {
      throw new ErrorHandler(401, 'Incorrect password. Please try again.');
    }

    return user;
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error; 
    }

    throw new ErrorHandler(500, 'Something went wrong during login.');
  }
}
}