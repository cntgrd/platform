const udev = require('udev');
const serialport = require('serialport');
const EventEmitter = require('events');

class DeviceHandler extends EventEmitter {
  /**
   * @constructor
   * Finds all currently plugged in serial ports, filers whether or not
   * it's an Arduino, then creates new SerialPort instances
   */
  constructor() {
    super();
    /**
     * @member {Array} ports
     * Array of serialport.SerialPort objects
     */
    this.ports = serialport.list()
      .then((ports) => {
        const serialPorts = ports.filter((port) => {
          const manufacturer = port.manufacturer || 'fuck';
          const isArduino = manufacturer.includes('FTDI') || manufacturer.includes('Arduino');
          return isArduino;
        })
          .map(port => new serialport.SerialPort(port.comName));
        return serialPorts;
      })
      .catch((err) => {
        this.emit('error', err);
        throw new Error(err);
      });
    this.monitor = udev.monitor();
  }

  start() {
    this.monitor.on('add', (device) => {
      if (device.SUBSYTEM === 'tty' && !this.devices[device.DEVNAME]) {
        const tmpDevice = {};
        const tmpName = device.DEVNAME;
        const port = new serialport.SerialPort(tmpName, { baudRate: 9600 });
        tmpDevice[tmpName] = port;
        this.ports = { ...this.ports, ...tmpDevice };
        console.log(`added ${tmpName}`);
      }
    });

    this.monitor.on('remove', (device) => {
      if (device.SUBSYSTEM === 'tty') {
        delete this.ports[device.DEVNAME];
        console.log(`deleted ${device.DEVNAME}`);
      }
    });

    Object.values(this.ports).forEach((port) => {
      port.on('data', (data) => {
        this.emit('data', data);
      });

      port.on('error', (err) => {
        this.emit('error', err);
      });
    });
  }
}

module.exports = DeviceHandler;
