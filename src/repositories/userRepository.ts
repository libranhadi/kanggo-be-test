import bcrypt from 'bcryptjs';
import db from '../config/database';
import { User, CreateUserDTO } from '../model/User';
import { ErrorHandler } from '../helper/errorHandler';

const TABLE_NAME = 'users';

export default class UserRepository {
  async create(userData: CreateUserDTO): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const [user] = await db(TABLE_NAME)
        .insert({
          ...userData,
          password: hashedPassword,
          created_at: db.fn.now(),
          updated_at: db.fn.now()
        })
        .returning('*');
      return user;
    } catch (error) {
      throw new ErrorHandler(500, 'Failed to create user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await db(TABLE_NAME)
        .join('roles', 'users.role_id', 'roles.id')
        .select('users.*', 'roles.name as role')
        .where('users.email', email)
        .first();
    } catch (error) {
      throw new ErrorHandler(500, 'Failed to find user by email');
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      return await db(TABLE_NAME)
        .where({ id })
        .first();
    } catch (error) {
      throw new ErrorHandler(500, 'Failed to find user by ID');
    }
  }

  async findWithRole(id: number): Promise<(User & { role_name: string }) | null> {
    try {
      return await db(TABLE_NAME)
        .join('roles', 'users.role_id', 'roles.id')
        .select('users.*', 'roles.name as role_name')
        .where('users.id', id)
        .first();
    } catch (error) {
      throw new ErrorHandler(500, 'Failed to find user with role');
    }
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    try {
      const [user] = await db(TABLE_NAME)
        .where({ id })
        .update({
          ...userData,
          updated_at: db.fn.now()
        })
        .returning('*');
      return user;
    } catch (error) {
      throw new ErrorHandler(500, 'Failed to update user');
    }
  }

  async softDelete(id: number): Promise<void> {
    try {
      await db(TABLE_NAME)
        .where({ id })
        .update({
          deleted_at: db.fn.now()
        });
    } catch (error) {
      throw new ErrorHandler(500, 'Failed to soft delete user');
    }
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, user.password);
    } catch (error) {
      throw new ErrorHandler(500, 'Failed to validate password');
    }
  }
}
