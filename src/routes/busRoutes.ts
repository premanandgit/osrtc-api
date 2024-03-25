import express from 'express';
import { getBus, updateBus, deleteBus, getAllBuses, addBus } from '../controllers/busController';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();
router.get('/', authenticate, getAllBuses);

router.get('/:id', authenticate, getBus);

router.post('/', authenticate, addBus);

router.put('/:id', authenticate, updateBus);

router.delete('/:id', authenticate, deleteBus);

export default router;