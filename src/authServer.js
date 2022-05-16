const express = require('express');
const app = express();
const port = 3500;
const route = require('./routes/index.js');
const db = require('./config/db/index.js');
db.connect();
route(app);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })