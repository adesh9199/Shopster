// functions/handler.js

const serverless = require('serverless-http');
const createApp = require('../app');
const db = require('../config/mongoose-connection'); // Import your DB connection

const app = createApp();

module.exports.handler = serverless(app);
