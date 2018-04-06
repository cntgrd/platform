/**
 * Transforms the JSON supplied by the Arduino into
 * the JSON the server expects
 * @function jsonParser
 * @arg {string} input Raw JSON string from the Arduino
 * @return {Object} Formatted JSON
 */
const jsonParser = (input) => {
    let initJson = {};
    try {
      initJson = JSON.parse(input);
    } catch (e) {
      throw new Error('invalid JSON, possibly a serial error');
    }
    const finalJson = ((data) => {
      // do stuff to the data here
      return data;
    })(initJson);
    return finalJson;
};

/**
 * Transforms the JSON supplied by the Arduino into
 * the protobuf the server expects
 * @function protobufParser
 * @arg {string} input Raw JSON string from the Arduino
 * @return {Protobuf} Protobuf for the server
 */

const protobuf = require('protobufjs');
const protobufParser = (input) => {
  
};

module.exports = { jsonParser, protobufParser };
