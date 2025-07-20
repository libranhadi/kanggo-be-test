import db from '../../config/database';
import dayjs from 'dayjs';

export async function updateOrdersToActive(date?: string): Promise<number> {
  const today = date ?? dayjs().format('YYYY-MM-DD');

  return db('orders')
    .where({ status: 'paid' })
    .andWhere('start_date', today)
    .update({ status: 'active', start_date : today , updated_at: new Date() });
}

export async function updateOrdersToCompleted(date?: string): Promise<number> {
  const today = date ?? dayjs().format('YYYY-MM-DD');

  return db('orders')
    .where({ status: 'active'})
    .andWhere('end_date', today)
    .update({ status: 'completed', end_date : today , updated_at: new Date() });
}
