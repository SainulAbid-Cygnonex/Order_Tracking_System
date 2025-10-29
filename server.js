const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./db/connection');
const app = require('./app');
const registerSocket = require('./sockets/socket');
require('dotenv').config();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });
registerSocket(io);

connectDB();

server.listen(3000, () => {
  console.log('Server listening on 3000');
});
