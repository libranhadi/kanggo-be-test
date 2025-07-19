// src/repositories/userRepository.ts
import bcrypt from 'bcryptjs';
import db from '../config/database';
import { User, CreateUserDTO } from '../model/User';

const TABLE_NAME = 'users';

export const UserRepository = {
  async create(userData: CreateUserDTO): Promise<User> {
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
  },

  async findByEmail(email: string): Promise<User | null> {
    return db(TABLE_NAME)
      .where({ email })
      .first();
  },

  async findById(id: number): Promise<User | null> {
    return db(TABLE_NAME)
      .where({ id })
      .first();
  },

  async findWithRole(id: number): Promise<(User & { role_name: string }) | null> {
    return db(TABLE_NAME)
      .join('roles', 'users.role_id', 'roles.id')
      .select('users.*', 'roles.name as role_name')
      .where('users.id', id)
      .first();
  },

  async update(id: number, userData: Partial<User>): Promise<User> {
    const [user] = await db(TABLE_NAME)
      .where({ id })
      .update({
        ...userData,
        updated_at: db.fn.now()
      })
      .returning('*');
    
    return user;
  },

  async softDelete(id: number): Promise<void> {
    await db(TABLE_NAME)
      .where({ id })
      .update({
        deleted_at: db.fn.now()
      });
  },

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
};