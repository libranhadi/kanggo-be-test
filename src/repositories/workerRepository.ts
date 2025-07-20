import db from '../config/database';
import { Worker } from '../model/Worker';
import { ErrorHandler } from '../helper/errorHandler';

const TABLE_NAME = 'workers';

export default class WorkerRepository {
  async findAll(): Promise<Worker[]> {
    try {
        return await db(TABLE_NAME).select('*').whereNull('deleted_at');
    } catch (error) {
        console.log(error)
        throw new ErrorHandler(500, 'Failed to retrieve worker');
    }
  }
    async create(data: Worker): Promise<Worker> {
    try {
      const [worker] = await db(TABLE_NAME)
      .insert({
        ...data,
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
      })
      .returning('*');
      return worker;
    } catch (error) {
      throw new ErrorHandler(500, 'Failed to create worker');
    }
  }

  async update(id: number, data: Partial<Worker>): Promise<Worker> {
    try {
        const [worker] = await db(TABLE_NAME)
        .where({ id })
        .update({ ...data, updated_at: db.fn.now() })
        .returning('*');
        return worker;
    } catch (error) {
        throw new ErrorHandler(500, 'Failed to update worker ');
    }
  }

   async findById(id: string|number): Promise<Worker | null> {
    try {
      return await db(TABLE_NAME)
        .where({id})
        .whereNull('deleted_at')
        .first();
    } catch (error) {
        console.log(error)
      throw new ErrorHandler(500, 'Failed to find worker');
    }
  }

  async delete(id: number): Promise<void> {
    try {
        await db(TABLE_NAME).where({ id }).update({ deleted_at: db.fn.now() });
    } catch (error) {
        throw new ErrorHandler(500, 'Failed to delete worker');
    }
  }

  async getWorkerByIds(workerIds: number[]) : Promise<Worker[]> {
    return db('workers')
      .select('id', 'worker_name', 'price')
      .whereIn('id', workerIds)
      .whereNull('deleted_at');
  }

}