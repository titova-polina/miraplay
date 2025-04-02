const mongoose = require('mongoose');
require('dotenv').config();

const db = mongoose.connect(process.env.DB_HOST);

mongoose.connection.once('open', async function () {
  console.log('Database connection successful');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error. Error message: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.');
});

module.exports = { db };
