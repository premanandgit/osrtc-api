import net from 'net';

const tcpClients = new Map<string, net.Socket>();

const tcpServer = net.createServer((socket: net.Socket) => {
  const clientId = `${socket.remoteAddress}:${socket.remotePort}`;
  tcpClients.set(clientId, socket);

  console.log(`TCP/IP client connected: ${clientId}`);

  socket.on('data', (data) => {
    console.log(`Received data from ${clientId}: ${data.toString()}`);
    socket.write('Message Received');
    // Process data from this client
  });

  socket.on('end', () => {
    tcpClients.delete(clientId);
    console.log(`TCP/IP client disconnected: ${clientId}`);
  });

  socket.on('error', (err) => {
    console.error('MQTT Client error:', err);
    // Handle the error as needed (e.g., reconnect, log, etc.)
  });

  socket.on('close', () => {
    console.log('MQTT Client closed');
    // Handle client close event if necessary
  });

});

// Start listening on port 3001
tcpServer.listen(3001, () => {
  console.log('TCP/IP server listening on port 3001');
});

const sendToTCPClient = (clientId: string, message: any) => {
  const firstClientId = tcpClients.keys().next().value;
  const socket = tcpClients.get(firstClientId);
  if (socket) {
    socket.write(JSON.stringify(message));
    console.log(`Sent message to client ${firstClientId}: ${JSON.stringify(message)}`);
  } else {
    console.error(`Client ${firstClientId} not found`);
  }
}

export { tcpServer, tcpClients, sendToTCPClient };
