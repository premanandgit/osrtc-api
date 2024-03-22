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

export const addDepot = async (req: Request, res: Response): Promise<void> => {
    try {
      // Extract depot data from request body
      const { name, location } = req.body;
  
      // Validate request data
      if (!name || !location) {
        res.status(400).json({ error: 'Name and location are required' });
        return;
      }
  
      // Create a new depot instance
      const newDepot: DepotDocument = new Depot({
        name,
        location,
      });
  
      // Save the depot to the database
      await newDepot.save();
  
      // Send success response
      res.status(201).json({ message: 'Depot added successfully', depot: newDepot });
    } catch (error) {
      console.error('Error adding depot:', error);
      res.status(500).json({ error: 'Internal server error' });
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
