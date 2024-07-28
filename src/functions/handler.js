// functions/handler.js

const serverless = require('serverless-http');
const app = require('../app'); // Adjust the path to reflect the correct location of app.js
require('../config/mongoose-connection'); // Ensure your DB connection is initialized

module.exports.handler = serverless(app);
