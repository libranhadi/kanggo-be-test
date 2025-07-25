export interface Worker {
  id?: number;
  worker_name: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
}

export type SafeWorkerResponse = Pick<Worker, 'worker_name'> & any;