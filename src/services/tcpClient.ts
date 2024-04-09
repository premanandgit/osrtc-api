import net from 'net';

const serverAddress = '172.18.16.1'; // Replace with your server's local IP address
const serverPort = 3001;

const client = new net.Socket();

client.connect(serverPort, serverAddress, () => {
  console.log('Connected to TCP/IP server');

  // Send data to the server
  client.write('Hello from Raspberry Pi client!');
});

client.on('data', (data: Buffer) => {
  console.log(`Received data from server: ${data.toString()}`);
  // Process data received from the server
});

client.on('close', () => {
  console.log('Connection to server closed');
});

client.on('error', (err: Error) => {
  console.error('Error in connection:', err);
});
