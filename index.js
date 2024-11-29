const express = require('express');
const swaggerSetup = require('./swagger');
const f_api1= require('./api/oic');
const md_auth= require('./middleware/auth');
const crs = require('./middleware/cross-site');

const app = express();
const port = 3000;

require('dotenv').config();
app.use(express.json());
swaggerSetup(app);



app.use('/api-oic', f_api1);
app.use('/api-auth', md_auth);




// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/swagger`);
});
