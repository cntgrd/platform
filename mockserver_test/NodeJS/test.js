const DummyHandler = require('./DummyHandler');
const superagent = require('superagent');

const deviceHandler = new DummyHandler();

console.log(deviceHandler.data);

const url = 'https://cf4f5b8e-99ee-46f1-96fb-428394f44234.mock.pstmn.io';


var ts = Math.round((new Date()).getTime() / 1000);
console.log(ts);

var buffer = deviceHandler.data;
buffer.timestamp = ts;

console.log(buffer);

superagent
    .get(url + '/getsth')
    .end((err, res) => {
        if (err) { return console.log(err); }
        console.log(res.body);
    });

superagent
    .post(url + '/postpb')
    .send(deviceHandler.data)
    .end((err,res) => {
        if (err) { return console.log(err); }
        console.log(res.body);
        console.log(res.status);
    });
// deviceHandler.on('data', (data) => {
//   console.log(data);
// });

// deviceHandler.on('error', (err) => {
//   console.error(err);
// });

