import express, { Request } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import depotRoutes from './routes/depotRoutes';
import busRoutes from './routes/busRoutes';
import { errorHandler } from './middleware/errorHandler';
import { logRequest } from './middleware/logRequest';
import { createTraceId } from './middleware/createTraceId';
import { checkDBConnection } from './middleware/checkDBConnection';
import { createServer } from 'http';
import { initWebSocket } from './services/socketModule';
import connectToMongoDB from './services/db';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

app.use(cors<Request>());
app.use(express.json());

app.use(createTraceId);
app.use(logRequest);
app.use('/api', checkDBConnection);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/depots', depotRoutes);
app.use('/api/buses', busRoutes);

app.use(errorHandler);

initWebSocket(server);
connectToMongoDB()
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        app.get('/', (req, res) => {
            res.status(500).send('Failed to connect to the database. Please try again later.');
        });
        console.error('Error connecting to MongoDB:', error);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });