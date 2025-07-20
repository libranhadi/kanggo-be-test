import db from '../config/database';
import { ErrorHandler } from '../helper/errorHandler';
import { Order } from '../model/Order';

export default class OrderRepository {
   async listOrderUser(userId : string)  : Promise<any[]> {
    try {
        return db('order_workers as ow')
        .join('orders as o', 'ow.order_id', 'o.id')
        .join('workers as w', 'ow.worker_id', 'w.id')
        .where('o.user_id', userId)
        .select('o.*', 'w.*', 'ow.worker_id')
        .distinct('o.id')

    } catch (error) {
      throw new ErrorHandler(500, 'An unknown error occurred')
    }
  }

  async checkWorkerSchedule(workerIds: number[], startDate: string, endDate: string)  : Promise<any[]> {
    try {
        return db('order_workers as ow')
        .join('orders as o', 'ow.order_id', 'o.id')
        .join('workers as w', 'ow.worker_id', 'w.id')
        .whereNull('w.deleted_at')
        .whereIn('ow.worker_id', workerIds)
        .whereIn('o.status', ['paid', 'active'])
        .whereRaw('NOT (o.end_date < ? OR o.start_date > ?)', [startDate, endDate])
        .select('o.start_date')
        .distinct();
    } catch (error) {
      throw new ErrorHandler(500, 'An unknown error occurred')
    }
  }

  async createOrder(trx: any, data: {
    start_date: string;
    user_id: number,
    end_date: string;
    total_day: number;
    total_price: number;
    status: string;
  }) {
    const [id] = await trx('orders').insert(data).returning('id');
    return typeof id === 'object' ? id.id : id;
  }

  async attachWorkers(trx: any, orderId: number, workerIds: number[]) {
    const records = workerIds?.map((workerId) => ({
      order_id: orderId,
      worker_id: workerId,
    }));
    await trx('order_workers').insert(records);
  }

  async findById(data : {
    id: string|number;
    user_id: number;
  }, )  : Promise<any> {
    try {
        return db('orders as order')
        .where(data)
        .select('order.*')
        .first()
    } catch (error) {
      throw new ErrorHandler(500, 'An unknown error occurred')
    }
  }

  async cancel(data : {
    id: string|number;
    status: string;
  }, )  : Promise<Order> {
    try {
        const [order] = await db('orders')
        .where("id", data.id)
        .update({ ...data, updated_at: db.fn.now() })
        .returning('*');

        return order
    } catch (error) {
      throw new ErrorHandler(500, 'An unknown error occurred')
    }
  }
};
