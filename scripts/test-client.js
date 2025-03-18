const io = require('socket.io-client');
const socket = io(`http://localhost:3000`, {
  query: { userId: '123' },
});

socket.on('connect', () => {
  console.log('Connected:', socket.id);
  socket.emit('test', `Hello, Socket!`);
});

socket.on('testResponse', (data) => {
  console.log('Received:', data);
  socket.disconnect();
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});
