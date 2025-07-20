import { Router } from 'express';
import OrderRepository from '../repositories/orderRepository';
import { OrderService } from '../service/orderService';
import { OrderController } from '../controller/orderController';
import WorkerRepository from '../repositories/workerRepository';

const router = Router();
const repo = new OrderRepository();
const repoWorker = new WorkerRepository();
const service = new OrderService(repo, repoWorker);
const orderController = new OrderController(service);

router.get('/orders', orderController.listWorker);
router.post('/orders', orderController.validateCreateWorker(), orderController.create);
router.put('/orders/:id', orderController.validateCancelWorker(), orderController.cancel);
export default router;