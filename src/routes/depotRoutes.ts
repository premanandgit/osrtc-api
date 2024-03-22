import express from 'express';
import { getDepot, updateDepot, deleteDepot, getAllDepots, addDepot } from '../controllers/depotController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();
router.get('/', authenticate, getAllDepots);

router.get('/:id', authenticate, getDepot);

router.post('/', authenticate, addDepot);

router.put('/:id', authenticate, updateDepot);

router.delete('/:id', authenticate, deleteDepot);

export default router;