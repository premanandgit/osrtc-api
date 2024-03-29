import { Server, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { dbConnectionState } from './dbConnectionState';
import logger from '../utils/logger';
import { DBConnectionFailure } from '../models/CustomError';

let io: Server;

// Initialize WebSocket server
export function initWebSocket(server: HTTPServer): void {
  io = new Server(server);

  io.use((socket, next) => {
    console.log('use socket')
    try {
      dbConnectionState()
    }
    catch (error: any) {
      if (error instanceof DBConnectionFailure) {

        logger.error(`500 - DBConnection Failure: ${error.message}`, socket.id);
        socket.emit('error', 'DBConnection Failure');
        setTimeout(() => {
          socket.disconnect(true); // Close the socket connection after a delay
        }, 1000);
      }
      else {
        logger.error(`500 - Internal Server Error: ${error.message}`, socket.id);
      }
    }
    next();
  });

  io.on('connection', (socket: Socket) => {
    console.log('Client connected'); // Log when a client connects

    socket.on('customInfo', (data: { userId: string, authToken: string }) => {
      // Handle the received data (e.g., store it, authenticate the user, etc.)
      console.log('Received custom information from client:', data);
    });

    socket.on('offer', (offer) => {
      socket.broadcast.emit('offer', offer); // Broadcast offer to all clients except the sender
    });

    socket.on('answer', (answer) => {
      socket.broadcast.emit('answer', answer); // Broadcast answer to all clients except the sender
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

// Send message to all connected clients
export function sendMessage(message: any): void {
  if (io) {
    io.emit('message', message);
  } else {
    console.error('WebSocket server not initialized');
  }
}
