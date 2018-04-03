const DeviceHandler = require('./DeviceHandler');
// const DummyHandler = require('./DummyHandler');
//const ArduinoHandler = require('./ArduinoHandler');

const deviceHandler = new DeviceHandler();
deviceHandler.start();

deviceHandler.on('data', (data) => {
  console.log(data);
});

deviceHandler.on('error', (err) => {
  console.error(err);
});
