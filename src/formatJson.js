

const formatJSON = (data) => {
  let buffer = {};
  buffer.uuid = "41E81005-5BCD-4A4A-A680-8B93C262E362";
  buffer.measurements = [];
  
  for(key in data.data){
    var buf = {};
    buf.time = "1522359317";
    var temp = {};
    temp.value = data.data[key].value;
    buf[key] = temp; 
    console.log(buf[key]);
    buf.sensor = {};
    buf.sensor.uuid = "469BA109-0CCE-4223-8278-13217844F513";
    buf.sensor.sensorType = key;
    console.log(buf.sensor);
    buffer.measurements.push(buf);
  }
  return buffer;
}


module.exports = {formatJSON};