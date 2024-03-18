import express from 'express';
import { changePassword, changeUserRole, login, signup } from '../controllers/authController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();
router.post('/login', login)
router.post('/signup', signup)
router.post('/change-password', changePassword)
router.post('/change-user-role', authenticate, changeUserRole)

export default router;
