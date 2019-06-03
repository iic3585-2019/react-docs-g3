/* eslint no-console: "off" */
require('dotenv').config();
const _ = require('lodash');
const http = require('http');
const apps = require('./src/app');
const db = require('./src/models');
const socket = require('socket.io');

const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => console.error('Unable to connect to the database:', err));
