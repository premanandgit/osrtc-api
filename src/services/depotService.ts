import { NotFoundError } from '../models/CustomError';
import Depot from '../models/Depot';

export const findById = async (depotId: string) => {
    const depot = await Depot.findById(depotId);
    if (!depot) {
        throw new NotFoundError('Depot Not Found')
    }
    return depot
}