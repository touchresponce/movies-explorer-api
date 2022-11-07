require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');

const {
  PORT = 3000,
  NODE_ENV,
  MONGO_URL,
  DEFAULT_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : DEFAULT_URL);

app.use(cors());

app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(require('./routes'));

app.use(errorLogger);
app.use(errors()); // celebrate
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
