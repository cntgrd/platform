const { ArduinoHandler, DeviceHandler, DummyHandler } = require('./handlers');

const deviceHandler = new ArduinoHandler();
// deviceHandler.start();

deviceHandler.on('data', (data) => {
  console.log(data);
});

deviceHandler.on('error', (err) => {
  console.error(err);
});
