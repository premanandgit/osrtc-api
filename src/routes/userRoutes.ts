import express from 'express';
import { getUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();
router.get('/', authenticate, getAllUsers);

// GET /api/users/:id
router.get('/:id', authenticate, getUser);

// PUT /api/users/:id
router.put('/:id', authenticate, updateUser);

// DELETE /api/users/:id
router.delete('/:id', authenticate, deleteUser);

export default router;