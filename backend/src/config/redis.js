const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-15754.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 15754
    }
});

module.exports = redisClient;