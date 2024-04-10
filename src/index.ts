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
import { startMqttServer } from './services/mqttServer';

import { tcpServer, tcpClients } from './services/tcpServer';

import { createGenericPayload } from './services/payloadService';
import { GenericPayload } from './models/Payload';

// Example usage



// Example: Access tcpClients map
console.log('Current TCP clients:');
for (const clientId of tcpClients.keys()) {
    console.log(`Client ID: ${clientId}`);
}


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

app.post('/api/mqtt', (req, res) => {
    try {
        // Call the function to send data to the TCP server
        const clientId = 'clientIdReact';
        const action = 'PlayAd';
        const data = { key: 'value' };
        const payload: GenericPayload = createGenericPayload(clientId, action, data);
        console.log("Sending data from api...", payload)
        sendMessageToClient(payload)

        res.status(200).json({ success: true, message: 'Data sent to TCP server' });
    } catch (error) {
        console.error('Error sending data:', error);
        res.status(500).json({ success: false, message: 'Failed to send data' });
    }
});

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

const { sendMessageToClient } = startMqttServer();
// setInterval(() => {
//     const clientId = 'clientId';
//     const action = 'PlayAd';
//     const data = { key: 'value' };

//     const payload: GenericPayload = createGenericPayload(clientId, action, data);
//     console.log("Sending data...", payload)
//     sendMessageToClient(payload)
// }, 5000)