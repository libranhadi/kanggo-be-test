import { Worker, SafeWorkerResponse } from '../model/Worker';
import WorkerRepository from '../repositories/workerRepository';
import { mapToDTO } from '../utils/mapToDto';
import { ErrorHandler } from '../helper/errorHandler';
import { FormatterDate } from '../utils/dateFormatter';

export class WorkerService {
  constructor(private workerRepo: WorkerRepository) {}

  async getAll(): Promise<SafeWorkerResponse[]> {
    try {
      const workers = await this.workerRepo.findAll();
      const mappedWorkers = workers.map(worker => ({
        worker_id: worker.id,
        worker_name: worker.worker_name || '',
        price: worker.price || 0,      
        created_at: worker.created_at ? FormatterDate(worker.created_at, 'YYYY-MM-DD HH:mm:ss') : '',
        updated_at: worker.updated_at ? FormatterDate(worker.updated_at, 'YYYY-MM-DD HH:mm:ss') : ''
      }));
      

      return mappedWorkers;

      } catch (error) {
      if (error instanceof ErrorHandler) {
        throw error; 
      }
      throw new ErrorHandler(500, 'Something went wrong during, please try again later.');
    }
  }

  async create(data: Worker): Promise<SafeWorkerResponse> {
    try {
      const worker = await this.workerRepo.create(data);
      let creFormat = FormatterDate(worker.created_at, 'YYYY-MM-DD HH:mm:ss')

      let workResp :SafeWorkerResponse = {
          worker_id: worker.id,
          worker_name: worker.worker_name,
          price: worker.price,
          created_at: creFormat,
        }
      return workResp
      
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw error; 
      }
      
      throw new ErrorHandler(500, 'Something went wrong during, please try again later.');
    }
  }

  async update(id: number, data: Partial<Worker>): Promise<SafeWorkerResponse> {

    try {
      const worker = await this.workerRepo.findById(id);
      if (!worker) {
        throw new ErrorHandler(404, 'Worker not found');
      }
      const respWorker = await this.workerRepo.update(id, data);
      let creFormat = FormatterDate(respWorker.created_at, 'YYYY-MM-DD HH:mm:ss')
      
      let workResp :SafeWorkerResponse = {
          worker_id: respWorker.id,
          worker_name: respWorker.worker_name,
          price: respWorker.price,
          created_at: creFormat,
        }
      return workResp
      
    } catch (error) {
      if (error instanceof ErrorHandler) {
        throw error; 
      }
      
      throw new ErrorHandler(500, 'Something went wrong during, please try again later.');
    }
  }

  async delete(id: number): Promise<void> {
    await this.workerRepo.delete(id);
  }
}