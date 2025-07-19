import { Router } from 'express';
import { AuthController } from '../controller/authController';
import { AuthService } from '../service/authService';
import { UserRepository } from '../repository/userRepository';

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);


router.post('/register', authController.validateRegister(), authController.register.bind(authController));
router.post('/login', authController.validateLogin(), authController.login.bind(authController));

export default router;
