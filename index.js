const express = require('express');
const swaggerSetup = require('./swagger');
const md_auth = require('./middleware/auth');
const md_lk = require('./middleware/logloki');
const crs = require('./middleware/cross-site');
const apiServ1 = require('./routes/service1Routes');

const app = express();
const port = 9000;

require('dotenv').config();

app.use(express.json());
if (process.env.SWAGGER_UI_ON == 1)
  swaggerSetup(app);


app.use('/api', apiServ1);
app.use('/api-auth', md_auth);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/swagger`);
});
