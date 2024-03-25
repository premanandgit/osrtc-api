import { Request, Response } from 'express';
import Bus, { BusDocument } from '../models/Bus';
import * as DepotService from '../services/depotService';

export const getAllBuses = async (req: Request, res: Response): Promise<void> => {
    try {
        const buses: BusDocument[] = await Bus.find();
        res.json(buses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get bus details by ID
export const getBus = async (req: Request, res: Response): Promise<void> => {
    try {
        const busId = req.params.id;
        const bus = await Bus.findById(busId);
        if (!bus) {
            res.status(404).json({ error: 'Bus not found' });
            return;
        }
        res.json(bus);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const addBus = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extract bus data from request body
        const { registrationNumber, routeNo, ledType, depotId } = req.body;

        // Validate request data
        if (!registrationNumber || !routeNo || !ledType || !depotId) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        // Check if depotId exists (you may want to validate this further)
        const existingDepot = await DepotService.findById(depotId);

        // Create a new bus instance
        const newBus: BusDocument = new Bus({
            registrationNumber,
            routeNo,
            ledType,
            depot: existingDepot._id, // Assign the depot object or ID to the bus
        });

        // Save the bus to the database
        await newBus.save();

        // Send success response
        res.status(201).json({ message: 'Bus added successfully', bus: newBus });
    } catch (error) {
        console.error('Error adding bus:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update bus details
export const updateBus = async (req: Request, res: Response): Promise<void> => {
    try {
        const busId = req.params.id;
        const updatedData = req.body;
        const updatedBus = await Bus.findByIdAndUpdate(busId, updatedData, { new: true });
        if (!updatedBus) {
            res.status(404).json({ error: 'Bus not found' });
            return;
        }
        res.json(updatedBus);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete bus
export const deleteBus = async (req: Request, res: Response): Promise<void> => {
    try {
        const busId = req.params.id;
        const deletedBus = await Bus.findByIdAndDelete(busId);
        if (!deletedBus) {
            res.status(404).json({ error: 'Bus not found' });
            return;
        }
        res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
