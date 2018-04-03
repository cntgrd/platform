const udev = require('udev');
const Serialport = require('serialport');
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
     * Array of serialport objects
     */
    Serialport.list()
    .then(ports => {
      console.dir(ports);
    })
    .catch((err) => {
      console.error(err);
    });
    Serialport.list()
      .then((ports) => {
        console.log('getting plugged in arduinos');
        const serialPorts = ports.filter((port) => {
          const manufacturer = port.manufacturer || 'fuck';
          const isArduino = manufacturer.includes('FTDI') || manufacturer.includes('Arduino');
          return isArduino;
        })
          .map(port => new Serialport(port.comName));
        this.ports = serialPorts;
      })
      .catch((err) => {
        this.emit('error', err);
        console.error(err);
        throw new Error(err);
      });

    console.dir(this.ports);
    this.monitor = udev.monitor();
  }

  start() {
    this.monitor.on('add', (device) => {
      if (device.SUBSYTEM === 'tty' && !this.devices[device.DEVNAME]) {
        console.log(`adding ${device.DEVNAME}`);
        this.ports.push(new Serialport(device.DEVNAME, { baudRate: 9600 }));
        console.log(`added ${device.DEVNAME}`);
      }
    });

    this.monitor.on('remove', (device) => {
      if (device.SUBSYSTEM === 'tty') {
        console.log(`removing ${device.DEVNAME}`);
        const oldPort = this.ports.filter(port => port.path === device.DEVNAME);
        oldPort[0].close();
        this.ports = this.ports.filter(port => port.path !== device.DEVNAME);
        console.log(`deleted ${device.DEVNAME}`);
      }
    });

    console.dir(this.ports);

    this.ports.forEach((port) => {
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
