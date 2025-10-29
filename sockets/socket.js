const publisher = require('../utils/publisher');

const registerSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
  });

  publisher.registerIO(io); // To send events through ws and redis
};

module.exports = registerSocket;
