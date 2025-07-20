export type OrderStatus = 'paid' | 'active' | 'cancel' | 'completed';

export interface Order {
  id?: number;
  user_id: number;
  status: OrderStatus;
  start_date: Date;
  end_date: Date;
  total_day: number;
  total_price: number;
  created_at?: Date;
  updated_at?: Date;
}

export type SafeListOrderResponse = Omit<Order, 'updated_at' | 'user_id' | 'id'> & any;
