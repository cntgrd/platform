const DeviceHandler = require('./DeviceHandler');
console.log(DeviceHandler);
const deviceHandler = new DeviceHandler();
deviceHandler.start();

deviceHandler.on('data', data => {
  console.log(data);
});
