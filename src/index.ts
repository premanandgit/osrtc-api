import express, { Request } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors<Request>());

app.use(express.json())

app.use('/api/auth', authRoutes)

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        console.log('Connected to MongoDB');
        // Start server
        app.listen(3001, () => {
            console.log('Server is running on port 3001');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

