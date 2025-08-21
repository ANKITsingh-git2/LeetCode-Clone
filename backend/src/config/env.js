// Environment configuration with defaults
require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3000,
  JWT_KEY: process.env.JWT_KEY || 'your-secret-jwt-key-change-in-production',
  DB_CONNECT_STRING: process.env.DB_CONNECT_STRING || 'mongodb://localhost:27017/leetcode',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379'
};

module.exports = config; 