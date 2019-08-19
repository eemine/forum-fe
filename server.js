import express from 'express';
import './utils/dotenv';

const logger = require('./utils/logger')('server');

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World')
});

const host = process.env[`HOST_${process.platform.toUpperCase()}`];
const port = process.env.PORT || process.env.HOST_PORT;

app.listen(port, host, () => {
  logger.log('info', `App is running at http://${host}:${port} in ${app.get('env')} mode.`);
});
