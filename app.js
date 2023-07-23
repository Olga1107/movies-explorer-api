require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);
app.use(requestLogger);
app.use(cors({
  origin: [
    'http://helga.movies.nomoredomains.xyz',
    'https://helga.movies.nomoredomains.xyz',
    'http://localhost:3000'],
}));

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Ошибка на сервере ${PORT}`);
  }
});
