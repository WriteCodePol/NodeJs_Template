// D:\Pv_Project\NodeJs_Template\middleware\loki.js
require('dotenv').config();
const winston = require('winston');
const LokiTransport = require('winston-loki');
const express = require('express');
const router = express.Router();
const apiloki =process.env.API_LOG_LOKI;
// Create a logger instance


const logger = winston.createLogger({
  level: 'info',
  transports: [
    new LokiTransport({
      host: apiloki, // Replace with your Loki server URL
      labels: { app_name: 'template' },
      json: true,
      batching: true,
    })
  ]
});

// POST route to log data to Loki
router.post('/loki', async (req, res) => {
  const { name } = req.body;

  // Log the incoming request data to Loki
  logger.info('Body:', req.body);

  // Respond with the data
  res.status(200).json({ body: req.body, msg: 'method1' });
});

// Export logger and router
module.exports = {router,logger};

