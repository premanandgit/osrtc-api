import mongoose from 'mongoose';
import { DBConnectionFailure } from '../models/CustomError';

export const dbConnectionState = () => {
    console.log('mongoose.connection.readyState', mongoose.connection.readyState)
    if (mongoose.connection.readyState !== 1) {
        throw new DBConnectionFailure('DBConnectionFailure')
    }
};