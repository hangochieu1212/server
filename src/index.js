const express = require('express');
const app = express();
// require('dotenv').config();
// require('dotenv').config();
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 3000;
const route = require('./routes/index.js');
const db = require('./config/db/index.js');

//connect to DB
db.connect();
route(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})