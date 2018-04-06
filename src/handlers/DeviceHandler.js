const udev = require('udev');
const SerialPort = require('serialport');
const EventEmitter = require('events');

class DeviceHandler extends EventEmitter {
  /**
   * @constructor
   * @arg {[Object]} ports Result of SerialPort.list()
   * Finds all currently plugged in serial ports, filers whether or not
   * it's an Arduino, then creates new SerialPort instances
   */
  constructor(ports) {
    super();
    try {
      this.ports = ports.filter((port) => {
        const manufacturer = port.manufacturer || 'fuck';
        const isArduino = manufacturer.includes('FTDI') || manufacturer.includes('Arduino');
        return isArduino;
      }).map(port => new SerialPort(port.comName));
    } catch (e) {
      this.ports = [];
    }
    this.monitor = udev.monitor();
  }

  start() {
    this.monitor.on('add', (device) => {
      // console.log(`${device.DEVNAME} plugged in`);
      // console.dir(device);
      if (device.SUBSYTEM === 'tty') {
        console.log(`adding ${device.DEVNAME}`);
        this.ports.push(new SerialPort(device.DEVNAME, { baudRate: 9600 }));
        console.log(`added ${device.DEVNAME}`);
      }
    });

    this.monitor.on('remove', (device) => {
      if (device.SUBSYSTEM === 'tty') {
        console.log(`removing ${device.DEVNAME}`);
        const oldPort = this.ports.filter(port => port.path === device.DEVNAME);
        this.ports = this.ports.filter(port => port.path !== device.DEVNAME);
        console.log(`deleted ${device.DEVNAME}`);
      }
    });

    this.ports.forEach((port) => {
      const parser = new SerialPort.parsers.Readline();
      port.pipe(parser);
      parser.on('data', (data) => {
        this.emit('data', data);
      });

      port.on('error', (err) => {
        this.emit('error', err);
      });
    });
  }
}

module.exports = DeviceHandler;
