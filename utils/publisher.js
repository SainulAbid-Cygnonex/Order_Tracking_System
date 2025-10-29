const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URI || 'redis://localhost:6379/0',
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

(async () => {
  await redisClient.connect();
  console.log('Redis client connected');
})();

let ioInstance = null;
exports.registerIO = (io) => {
  ioInstance = io;
};

exports.publishEvent = async (event, data) => {
  try {
    await redisClient.publish('order-events', JSON.stringify({ type: event, data }));
    if (ioInstance) ioInstance.emit(event, data);
  } catch (error) {
    console.error('Failed to publish event:', error);
  }
};
