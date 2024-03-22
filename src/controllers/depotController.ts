import { Request, Response } from 'express';
import Depot, { DepotDocument } from '../models/Depot';

export const getAllDepots = async (req: Request, res: Response): Promise<void> => {
    try {
        const depots: DepotDocument[] = await Depot.find();
        res.json(depots);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get depot details by ID
export const getDepot = async (req: Request, res: Response): Promise<void> => {
    try {
        const depotId = req.params.id;
        const depot = await Depot.findById(depotId);
        if (!depot) {
            res.status(404).json({ error: 'Depot not found' });
            return;
        }
        res.json(depot);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update depot details
export const updateDepot = async (req: Request, res: Response): Promise<void> => {
    try {
        const depotId = req.params.id;
        const updatedData = req.body;
        const updatedDepot = await Depot.findByIdAndUpdate(depotId, updatedData, { new: true });
        if (!updatedDepot) {
            res.status(404).json({ error: 'Depot not found' });
            return;
        }
        res.json(updatedDepot);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete depot
export const deleteDepot = async (req: Request, res: Response): Promise<void> => {
    try {
        const depotId = req.params.id;
        const deletedDepot = await Depot.findByIdAndDelete(depotId);
        if (!deletedDepot) {
            res.status(404).json({ error: 'Depot not found' });
            return;
        }
        res.json({ message: 'Depot deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
