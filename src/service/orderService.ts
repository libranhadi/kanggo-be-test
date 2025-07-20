import db  from '../config/database';
import { ErrorHandler } from '../helper/errorHandler';
import OrderRepository from '../repositories/orderRepository';
import WorkerRepository from '../repositories/workerRepository';
import dayjs from 'dayjs';
import { FormatterDate } from '../utils/dateFormatter';
import { SafeListOrderResponse } from '../model/Order';

export class OrderService  {
    constructor(private orderRepo: OrderRepository, private workerRepository: WorkerRepository) {}
  async createOrderWorker(payload: {
    workers: number[];
    start_date: string;
    end_date: string;
    user_id: number;
  }) : Promise<any>  {
    const { workers, start_date, end_date, user_id } = payload;
    let currDate = FormatterDate(new Date().toISOString(), "YYYY-MM-DD");
    let stDate = FormatterDate(new Date(start_date).toISOString(), "YYYY-MM-DD");
    let endDate = FormatterDate(new Date(end_date).toISOString(), "YYYY-MM-DD");
    if (stDate > endDate) {
        throw new ErrorHandler(400, 'The start date request must be before the end date request.');
    }

    if (stDate < currDate) {
        throw new ErrorHandler(400, 'The start date request must be before or equal current date');
    }
    const totalDay = dayjs(end_date).diff(dayjs(start_date), 'day') + 1;
    const trx = await db.transaction();

    try {
      const workerList = await this.workerRepository.getWorkerByIds(workers);
      if (workerList.length <= 0) {
        throw new ErrorHandler(400, 'Worker not found');
      }
      const filteredWorkIds = workerList
        .map(w => w.id)
        .filter((id): id is number => id !== undefined);

      // for handle deleted worker
      if (filteredWorkIds.length != workers.length) {
          throw new ErrorHandler(400, `Some worker already has schedule`);
      }

      const checkWorkerConflictSchedule = await this.orderRepo.checkWorkerSchedule(workers, stDate, endDate);
      const filteredSchedule = checkWorkerConflictSchedule.map(w => FormatterDate(w.start_date, "YYYY-MM-DD")).join(", ")
      if (checkWorkerConflictSchedule.length >= 1) {
          throw new ErrorHandler(400, `Some worker already has schedule at ${filteredSchedule}`);
      }

      const totalPrice = workerList.reduce(
        (acc, worker) => acc + worker.price * totalDay,
        0
      );

      const orderId = await this.orderRepo.createOrder(trx, {
        start_date : stDate,
        end_date: endDate,
        user_id: user_id,
        total_day : totalDay,
        total_price: totalPrice,
        status: 'paid',
      });

      await this.orderRepo.attachWorkers(trx, orderId, filteredWorkIds);

      await trx.commit();

      return { order_id: orderId,
          workers : filteredWorkIds,
          total_day: totalDay,
          status: 'paid',
          total_price : totalPrice,
          created_at: FormatterDate(new Date().toISOString(), "YYYY-MM-DD")
        }
    } catch (err) {
      await trx.rollback();
      if (err instanceof ErrorHandler) {
        throw err; 
      }
      
      throw err;
    }
  }
  async listOrderUser(userId: string) {
      try {
        const orderList = await this.orderRepo.listOrderUser(userId);
        const groupedOrders = orderList.reduce((acc, order) => {
          const orderId = order.id;

          if (!acc[orderId]) {
            acc[orderId] = {
              order_id: order.id,
              status: order.status,
              start_date:   FormatterDate(order.start_date, "YYYY-MM-DD"),
              end_date:   FormatterDate(order.end_date, "YYYY-MM-DD"),
              total_day: order.total_day,
              total_price: order.total_price,
              created_at: FormatterDate(order.created_at, "YYYY-MM-DD HH:mm:ss"),
              workers: [],
            };
          }

          acc[orderId].workers.push({
            worker_id: order.worker_id,
            worker_name: order.worker_name,
            price: order.price,
          });

          return acc;
        }, {} as Record<number, any>);

        const result = Object.values(groupedOrders);
        return result as SafeListOrderResponse;
      } catch (error) {
        if (error instanceof ErrorHandler) {
          throw error; 
        }
        throw new ErrorHandler(500, 'Something went wrong, please try again later.');
      }
  }

  async cancel(payload: {
    status: string;
    id: string|number;
    user_id: number;
  }) : Promise<any>  {

    const {id, user_id, status } = payload;
    try {
      const orderDetail = await this.orderRepo.findById({user_id, id});
      if (!orderDetail) {
        throw new ErrorHandler(404, 'Order not found');
      }

      if (orderDetail.status == status) {
        throw new ErrorHandler(400, 'Order has cancelled');
      }

      const orderCancel = await this.orderRepo.cancel({id, status});
      return {
          "order_id": orderCancel.id,
          "status": orderCancel.status,
          "created_at": FormatterDate(orderCancel.created_at, "YYYY-MM-DD"),
          "updated_at": FormatterDate(orderCancel.updated_at, "YYYY-MM-DD"),
      };

    } catch (err) {
      if (err instanceof ErrorHandler) {
        throw err; 
      }
      
      throw err;
    }
  }

};
