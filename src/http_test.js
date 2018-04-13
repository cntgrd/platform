const req = require('superagent');
const { ArduinoHandler, DeviceHandler, DummyHandler } = require('./handlers');
const { jsonParser, protobufParser } = require('./parsers.js');

// replace with whatever handler is needed
const deviceHandler = new ArduinoHandler();
const url = 'localhost:3000';

deviceHandler.on('data', (data) => {
  let jsonData = {};
  try {
    jsonData = jsonParser(data);
  } catch (e) {
    console.log(e.message);
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

