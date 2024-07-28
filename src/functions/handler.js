// src/functions/handler.js

const serverless = require('serverless-http');
const createApp = require('../../app'); // Adjust the path to reflect the new structure
require('../../config/mongoose-connection'); // Ensure your DB connection is initialized

const app = createApp();

module.exports.handler = serverless(app);
