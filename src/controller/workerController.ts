import { Request, Response, NextFunction } from 'express';
import { WorkerService } from '../service/workerService';
import { successResponse } from '../helper/successHandler';
import { ErrorHandler } from '../helper/errorHandler';
import { body, validationResult } from 'express-validator';

export class WorkerController {
  constructor(private workerService: WorkerService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workers = await this.workerService.getAll("admin");
      successResponse(res, workers, 'List Of Workers', 200);
    } catch (err) {
      next(new ErrorHandler(500, 'Failed to get workers'));
    }
  };

  listWorker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workers = await this.workerService.getAll("all");
      successResponse(res, workers, 'List Of Workers', 200);
    } catch (err) {
      next(new ErrorHandler(500, 'Failed to get workers'));
    }
  };

  public validateCreateOrUpdate() {
    return [
      body('worker_name')
        .exists()
        .withMessage('worker name is required'),
      body('price')
        .exists()
        .withMessage('price is required'),
    ];
  }

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(400, errors.array()[0].msg);
      }
      const worker = await this.workerService.create(req.body);
      successResponse(res, worker, 'New Worker Created!', 201);
    } catch (error) {
       if (error instanceof ErrorHandler) {
        next(error);
      } else {
        next(new ErrorHandler(500, 'An unknown error occurred'));
      }
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ErrorHandler(400, errors.array()[0].msg);
      }
      const worker = await this.workerService.update(id, req.body);
      successResponse(res, worker, `Worker With ID ${id} Updated!`, 200);
    } catch (error) {
       if (error instanceof ErrorHandler) {
        next(error);
      } else {
        next(new ErrorHandler(500, 'An unknown error occurred'));
      }
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      await this.workerService.delete(id);
      successResponse(res, null, `Worker With ID ${id} Deleted`, 200);
    } catch (err) {
      next(new ErrorHandler(500, 'Failed to delete worker'));
    }
  };
}