// src/client.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000'); // Replace with your server URL

// Handle 'connect' event
socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  // Send a message to the server
  socket.emit('customInfo', { userId: '123456', authToken: 'abc123' });
  // socket.emit('message', 'Hello from client');
});

// Handle 'message' event from the server
socket.on('message', (message: string) => {
  console.log('Received message from server:', message);
});

// Handle 'disconnect' event
socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('error', (errorMessage) => {
  console.error('Socket error:', errorMessage);
  // Display the error message to the user or handle it appropriately
});
