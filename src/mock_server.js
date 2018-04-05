const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/echo', (req, res) => {
  console.log(`request from ${req.ip}: `);
  console.dir(req.body);
  const body = req.body || {};
  res.status(200).send(body);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
