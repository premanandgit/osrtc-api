import net from 'net';
import { GenericPayload } from '../models/Payload';
import { createGenericPayload } from './payloadService';

const serverAddress = '192.168.1.42'; // Replace with your server's local IP address
const serverPort = 3001;

const client = new net.Socket();
const clientId = "myId"

client.connect(serverPort, serverAddress, () => {
  console.log('Connected to TCP/IP server');

  const action = 'Client PlayAd';
  const data = { key: 'value' };
  const payload: GenericPayload = createGenericPayload(clientId, action, data);

  // Send data to the server
  client.write(JSON.stringify(payload));
});

client.on('data', (data: Buffer) => {
  console.log(`Received data from server: ${data.toString()}`);
  // Process data received from the server
});

client.on('close', () => {
  console.log('Connection to server closed');
  setTimeout(() => {
    client.connect(serverPort, serverAddress, () => {
      console.log('Reconnected to TCP/IP server');
    });
  }, 5000); // Reconnect after 5 seconds
});

client.on('error', (err: Error) => {
  console.error('Error in connection:', err);
});
