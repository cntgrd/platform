// const DeviceHandler = require('./DeviceHandler')
const DummyHandler = require('./DummyHandler');

const deviceHandler = new DummyHandler();
deviceHandler.start();

deviceHandler.on('data', (data) => {
  console.log(data);
});

deviceHandler.on('error', (err) => {
  console.error(err);
});
