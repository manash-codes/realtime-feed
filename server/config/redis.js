const redis = require('redis');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});


function connectRedis() {
    if (!redisClient.isOpen) {
        redisClient.connect()
            .then(() => console.log('Redis connected'))
            .catch(err => console.error('Redis connection error:', err));
    }
}

module.exports = {
    redisClient,
    connectRedis
};