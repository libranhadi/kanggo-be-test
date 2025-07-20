import { Router } from 'express';
import WorkerRepository from '../repositories/workerRepository';
import { WorkerService } from '../service/workerService';
import { WorkerController } from '../controller/workerController';

const router = Router();
const repo = new WorkerRepository();
const service = new WorkerService(repo);
const controller = new WorkerController(service);

router.get('/workers', controller.listWorker);

export default router;