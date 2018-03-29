const DummyHandler = require('./DummyHandler');
const superagent = require('superagent');

const deviceHandler = new DummyHandler();

console.log(deviceHandler.data);

const url = 'https://cf4f5b8e-99ee-46f1-96fb-428394f44234.mock.pstmn.io';

superagent
    .get(url + '/getsth')
    .end((err, res) => {
        if (err) { return console.log(err); }
        console.log(res.body);
    });

superagent
    .post(url + '/postpb')
    .end((err,res) => {
        if (err) { return console.log(err); }
        console.log(res.body);
    });
// deviceHandler.on('data', (data) => {
//   console.log(data);
// });

// deviceHandler.on('error', (err) => {
//   console.error(err);
// });

