const req = require('superagent');

// replace with proper handler as needed
const ArduinoHandler = require('./ArduinoHandler');

const deviceHandler = new ArduinoHandler();

const url = 'localhost:3000';

deviceHandler.on('data', (data) => {
  let jsonData = {};
  try {
    jsonData = JSON.parse(data);
  } catch (e) {
    console.log('invalid JSON parsed');
  }
  req
    .post(`${url}/echo`)
    .send(data)
    .end((err, res) => {
      if (err) console.error(err);
      console.log(res.body);
    });
});

deviceHandler.on('error', (err) => {
  console.error(err);
  req
    .post(`${url}/echo`)
    .send({ error: err })
    .end((err, res) => {
      if (err) console.error(err);
      console.log(res.body);
    });
});

