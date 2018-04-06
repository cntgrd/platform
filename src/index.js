const { ArduinoHandler, DeviceHandler, DummyHandler } = require('./handlers');
const SerialPort = require('serialport');

const ports = SerialPort.list().then(ports => {
  return ports;
});
const deviceHandler = new DeviceHandler(ports);
deviceHandler.start();

deviceHandler.on('data', (data) => {
  console.log(data);
});

deviceHandler.on('error', (err) => {
  console.error(err);
});
