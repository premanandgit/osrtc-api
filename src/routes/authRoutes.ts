import express from 'express';
import { changePassword, login, signup } from '../controllers/authController';

const router = express.Router();
router.post('/login', login)
router.post('/signup', signup)
router.post('/change-password', changePassword)

export default router;
