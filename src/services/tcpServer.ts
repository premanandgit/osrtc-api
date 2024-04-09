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
});

// Start listening on port 3001
tcpServer.listen(3001, () => {
  console.log('TCP/IP server listening on port 3000');
});

export { tcpServer, tcpClients };
