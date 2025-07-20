import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../service/orderService';
import { successResponse } from '../helper/successHandler';
import { ErrorHandler } from '../helper/errorHandler';
import { body, validationResult } from 'express-validator';
import { CustomRequest } from '../middleware/authMiddleware';

export class OrderController {
    constructor(private orderService: OrderService) {
        this.orderService = orderService
    }

    listWorker = async (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
        if (req.user?.role == 'admin') {
            throw new ErrorHandler(401, 'Access denied. Customer privileges required');
        }

        const workers = await this.orderService.listOrderUser(req.user.id);
        successResponse(res, workers, 'List Order', 200);
        } catch (error) {
            if (error instanceof ErrorHandler) {
                next(error);
            } else {
                console.log(error)
                next(new ErrorHandler(500, 'An unknown error occurred'));
            }
        }
    };
    
    public validateCreateWorker() {
    return [
        body('workers')
        .exists()
        .isArray()
        .withMessage('invalid request workers'),
        body('start_date')
        .exists()
        .isDate()
        .withMessage('invalid request start date'),
        body('end_date')
        .exists()
        .isDate()
        .withMessage('invalid request end date')
    ]}
    public create = async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
        ): Promise<void> => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    throw new ErrorHandler(400, errors.array()[0].msg);
                }
                let { user_id, workers, start_date, end_date } = req.body;
                user_id = req.user.id 
                if (req.user?.role == 'admin') {
                    throw new ErrorHandler(401, 'Access denied. Customer privileges required');
                }

                const worker = await this.orderService.createOrderWorker({ user_id, workers, start_date, end_date });
                successResponse(res, worker, 'Order created!', 201);
            } catch (error) {
                if (error instanceof ErrorHandler) {
                    next(error);
                } else {
                    console.log(error)
                    next(new ErrorHandler(500, 'An unknown error occurred'));
                }
            }
    };

    public validateCancelWorker() {
        return [
            body('status')
            .exists()
             .custom((value) => {
                if (value.toLowerCase() !== 'cancel') {
                    throw new Error('request status must be cancel');
                }
                return true;
            })
            .withMessage('invalid request cancel order')
    ]}
     public cancel = async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
        ): Promise<void> => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    throw new ErrorHandler(400, errors.array()[0].msg);
                }
                let { user_id, status, id } = req.body ;
                user_id = req.user.id 
                id = req.params.id

                if (req.user?.role == 'admin') {
                    throw new ErrorHandler(401, 'Access denied. Customer privileges required');
                }

                const worker = await this.orderService.cancel({ user_id, status,id});
                successResponse(res, worker, 'Order Canceled', 200);
            } catch (error) {
                if (error instanceof ErrorHandler) {
                    next(error);
                } else {
                    next(new ErrorHandler(500, 'An unknown error occurred'));
                }
            }
    };
}