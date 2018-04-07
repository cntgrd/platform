const { ArduinoHandler, DeviceHandler, DummyHandler } = require('./handlers');
const SerialPort = require('serialport');
const fs = require('fs');

(() => {
  const uuid = require('uuid/v4')();
  const data = `module.exports = ${uuid};`;
  fs.writeFile('./uuid.js', data, { flag: 'wx' }, (err) => {
    if(err) console.log('uuid already exists');
    console.log(`new uuid: ${uuid}`);
  });
})();

const ports = SerialPort.list().then(ports => {
  const uuid = require('./uuid.js');
  const deviceHandler = new DeviceHandler(ports, uuid);
  deviceHandler.start();

  deviceHandler.on('data', (data) => {
    console.log(data);
  });

  deviceHandler.on('error', (err) => {
    console.error(err);
  });
});

