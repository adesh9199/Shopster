// functions/handler.js

const serverless = require('serverless-http');
const createApp = require('../app');
const db = require('../config/mongoose-connection'); // Import your DB connection

const app = createApp();
// app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
