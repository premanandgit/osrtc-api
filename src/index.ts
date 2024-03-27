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
import { createServer } from 'http';
import { initWebSocket } from './services/socketModule'; 

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

app.use(cors<Request>());
app.use(express.json());

app.use(createTraceId);
app.use(logRequest);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/depots', depotRoutes);
app.use('/api/buses', busRoutes);

app.use(errorHandler);

initWebSocket(server);
mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });