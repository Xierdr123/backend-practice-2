require('dotenv').config();

const express = require('express');
const path = require('path');
const sequelize = require('./db');
const booksRouter = require('./routes/books');

const app = express();

app.use(express.json());

// Раздаём фронтенд из папки public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', booksRouter);

const PORT = process.env.PORT || 8080;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к PostgreSQL успешно');
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log('Сервер запущен на порту ' + PORT);
    });
  } catch (e) {
    console.error('Ошибка подключения к БД:', e.message);
  }
}

start();