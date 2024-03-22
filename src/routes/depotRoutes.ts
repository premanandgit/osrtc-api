import express from 'express';
import { getDepot, updateDepot, deleteDepot, getAllDepots } from '../controllers/depotController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();
router.get('/', authenticate, getAllDepots);

// GET /api/Depots/:id
router.get('/:id', authenticate, getDepot);

// PUT /api/Depots/:id
router.put('/:id', authenticate, updateDepot);

// DELETE /api/Depots/:id
router.delete('/:id', authenticate, deleteDepot);

export default router;