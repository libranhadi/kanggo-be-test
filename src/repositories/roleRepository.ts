import db from '../config/database';
import { Role } from '../model/Role';

const TABLE_NAME = 'roles';

export default class RoleRepository  {
  async findAll(): Promise<Role[]> {
    return db(TABLE_NAME).select('*');
  }

  async findById(id: number): Promise<Role | null> {
    return db(TABLE_NAME)
      .where({ id })
      .first();
  }

   async findByName(name: string): Promise<Role | null> {
    return db(TABLE_NAME)
      .where({name})
      .first();
  }
};