/* eslint no-console: "off" */
require('dotenv').config();
const apps = require('./src/app');
const db = require('./src/models');
const socket = require('socket.io');

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => console.error('Unable to connect to the database:', err));
