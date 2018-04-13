const Serialport = require('serialport');
const EventEmitter = require('events');

class ArduinoHandler extends EventEmitter {
  constructor() {
    super();
    Serialport.list()
      .then((ports) => {
        const arduinos = ports.filter((port) => {
          const manufacturer = port.manufacturer ? port.manufacturer : 'fuck';
          const isArduino = manufacturer.includes('FTDI') ||
            manufacturer.includes('Arduino');
          return isArduino;
        });
        const serialPorts = arduinos.map(arduino => new Serialport(arduino.comName, { baudRate: 9600 }));
        serialPorts.forEach((port) => {
          const parser = new Serialport.parsers.Readline();
          port.pipe(parser);
          parser.on('data', data => this.emit('data', data));
          port.on('error', (err) => {
            throw new Error(err);
          });
        });
      })
      .catch((err) => {
        this.emit('error', err);
      });
  }
}

module.exports = ArduinoHandler;
