const EventEmitter = require('events');

class DummyHandler extends EventEmitter {
  constructor() {
    super();
    this.data = {
      sensor: 'gas',
      data: {
        co2: {
          unit: 'ppm',
          value: 450,
        },
        voc: {
          unit: 'ppb',
          value: 20,
        },
      },
    };
  }

  start() {
    setInterval(() => {
      this.emit('data', JSON.stringify(this.data));
      if (Math.random() >= 0.8) {
        this.emit('error', {
          error: 'test error',
        });
      }
    }, 1000);
  }
}

module.exports = DummyHandler;
