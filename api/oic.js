const express = require('express');
const router = express.Router();

const { logger } = require('../middleware/logloki');  // นำเข้า logger และ router จาก loki.js

// Sample route ddd
router.get('/Hello', (req, res) => {
  logger.info('Hello World!'+ req.ip);
  res.send('Hello World!' + req.ip);
});

router.post('/method1', async (req, res) => {
  const { name } = req.body;
  logger.info('Body:',req.body);
  res.status(200).json({ body: req.body, msg: 'method1' });
});


module.exports = router;