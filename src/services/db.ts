// db.ts

import mongoose from 'mongoose';

const MAX_RETRIES = 1;
const RETRY_DELAY = 1000;

const connectToMongoDB = async (): Promise<void> => {
    let retryCount = 0;

    while (retryCount < MAX_RETRIES) {
        try {
            await mongoose.connect('mongodb://localhost:27017/test');
            console.log('Connected to MongoDB');
            return;
        } catch (error) {
            console.error(`Error connecting to MongoDB (attempt ${retryCount + 1}):`, error);
            retryCount++;
            await wait(RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
        }
    }

    throw new Error('Failed to connect to MongoDB after multiple attempts.');
};

const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export default connectToMongoDB;
