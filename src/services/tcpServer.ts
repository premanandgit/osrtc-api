import net from 'net';

// Map to store client sockets by client ID
const clients = new Map<string, net.Socket>();

const tcpServer = net.createServer((socket: net.Socket) => {
  let clientId = ''; // Initialize client ID for each connection

  socket.on('data', (data) => {
    console.log(`Received data from ${clientId}: ${data.toString()}`);
    const jsonData = JSON.parse(data.toString());
    clientId = jsonData.clientId; // Update client ID based on data received

    // Store the client socket in the map
    clients.set(clientId, socket);

    socket.write('Message Received');
    // Process data from this client
  });

  socket.on('end', () => {
    if (clientId && clients.has(clientId)) {
      // Remove client from the map on disconnect
      clients.delete(clientId);
      console.log(`TCP/IP client disconnected: ${clientId}`);
    }
  });

  socket.on('error', (err) => {
    console.error('TCP/IP Client error:', err);
    // Handle the error as needed (e.g., reconnect, log, etc.)
  });

  socket.on('close', () => {
    console.log('TCP/IP Client closed');
    // Handle client close event if necessary
  });
});

// Start listening on port 3001
tcpServer.listen(3001, () => {
  console.log('TCP/IP server listening on port 3001');
});

const sendToTCPClient = (clientId: string, message: any) => {
  const socket = clients.get(clientId);
  if (socket) {
    socket.write(JSON.stringify(message));
    console.log(`Sent message to client ${clientId}: ${JSON.stringify(message)}`);
  } else {
    console.error(`Client ${clientId} not found`);
  }
};

export { tcpServer, sendToTCPClient };
