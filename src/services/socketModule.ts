import { Server, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';

let io: Server;

// Initialize WebSocket server
export function initWebSocket(server: HTTPServer): void {
  io = new Server(server);

  io.on('connection', (socket: Socket) => {
    console.log('Client connected'); // Log when a client connects

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
