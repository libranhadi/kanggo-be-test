import { Router } from 'express';
import { AuthController } from '../controller/authController';
import { AuthService } from '../service/authService';
import UserRepository from '../repositories/userRepository';
import RoleRepository from '../repositories/roleRepository';

const router = Router();
const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const authService = new AuthService(userRepository, roleRepository);
const authController = new AuthController(authService);


router.post('/register', authController.validateRegister(), authController.register.bind(authController));
router.post('/login', authController.validateLogin(), authController.login.bind(authController));

export default router;
