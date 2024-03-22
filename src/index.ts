import express, { Request } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import depotRoutes from './routes/depotRoutes';
import { errorHandler } from './middleware/errorHandler';
import { logRequest } from './middleware/logRequest';
import { createTraceId } from './middleware/createTraceId';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors<Request>());
app.use(express.json());

app.use(createTraceId);
app.use(logRequest);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/depots', depotRoutes);

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });