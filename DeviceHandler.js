const udev = require('udev'); //todo: install libudev-dev
const serialport = require('serialport');
const EventEmitter = require('events');


class DeviceHandler extends EventEmitter {

  constructor() {
    super();
    this.monitor = udev.monitor();
    this.ports = {};
    serialport.list()
      .then(devices => {
        devices.filter(device => {
          !!device.vendorId;
        })
          .forEach(device => {
            console.log(device);
            const name = device.comName;
            const port = new SerialPort(device.comName, { baudRate: 9600 });
            const newPort = {};
            newPort[name] = port;
            this.ports = { ...this.ports, ...newPort };
          });
      });
  }

  start() {
    this.monitor.on('add', device => {
      if (device.SUBSYTEM === 'tty' && !this.devices[device.DEVNAME]) {
        const tmpDevice = {};
        const tmpName = device.DEVNAME;
        const port = new SerialPort(tmpName, { baudRate: 9600 });
        tmpDevice[tmpName] = port;
        this.ports = { ...this.ports, ...tmpDevice };
        console.log(`added ${tmpName}`);
      }
    });

    this.monitor.on('remove', device => {
      if (device.SUBSYSTEM === 'tty') {
        delete this.ports[device.DEVNAME];
        console.log(`deleted ${device.DEVNAME}`);
      }
    });

    Object.values(this.ports).forEach(port => {
      port.on('data', data => {
        this.emit('data', data);
      });
    });
  }
}

module.exports = DeviceHandler;
