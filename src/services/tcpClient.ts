import net from 'net';
import { GenericPayload } from '../models/Payload';
import { createGenericPayload } from './payloadService';

const serverAddress = '172.27.48.1'; // Replace with your server's local IP address
const serverPort = 3001;

const client = new net.Socket();
const clientId = "myId"

client.connect(serverPort, serverAddress, () => {
  console.log('Connected to TCP/IP server');

  const action = 'Client PlayAd';
  const data = { key: 'value' };
  const payload: GenericPayload = createGenericPayload(clientId, action, data);
  client.write(JSON.stringify(payload));
});

client.on('data', (data: Buffer) => {
  console.log(`Received data from server: ${data.toString()}`);
});

client.on('close', () => {
  console.log('Connection to server closed');
  setTimeout(() => {
    client.connect(serverPort, serverAddress, () => {
      console.log('Reconnected to TCP/IP server');
      const action = 'Client PlayAd';
      const data = { key: 'value' };
      const payload: GenericPayload = createGenericPayload(clientId, action, data);
      client.write(JSON.stringify(payload));
    });
  }, 5000);
});

client.on('error', (err: Error) => {
  console.error('Error in connection:', err);
});
