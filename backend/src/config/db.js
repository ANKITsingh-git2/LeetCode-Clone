const mongoose = require('mongoose');
const config = require('./env');

async function main() {
    await mongoose.connect(config.DB_CONNECT_STRING)
}

module.exports = main;


