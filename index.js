const express = require('express');
const swaggerSetup = require('./swagger');
const f_api1= require('./api/oic');
const md_auth= require('./middleware/auth');
const md_lk= require('./middleware/logloki');
const crs = require('./middleware/cross-site');

const app = express();
const port = 9000;

require('dotenv').config();
app.use(express.json());
swaggerSetup(app);


app.use('/api-oic', f_api1);
app.use('/api-auth', md_auth);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/swagger`);
});
