const router = require('express').Router();
const Book = require('../models/Book');

// GET /books — список всех книг
router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll({ order: [['id', 'ASC']] });
    res.json(books);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// GET /books/:id — одна книга
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Книга не найдена' });
    res.json(book);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// POST /books — добавить книгу
router.post('/', async (req, res) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: 'Поля title и author обязательны' });
    }

    const book = await Book.create({ title, author, year });
    res.status(201).json(book);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// PUT /books/:id — обновить книгу
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Книга не найдена' });

    const { title, author, year } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: 'Поля title и author обязательны' });
    }

    await book.update({ title, author, year });
    res.json(book);
  } catch (e) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// DELETE /books/:id — удалить книгу
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Книга не найдена' });

    await book.destroy();
    res.json({ message: 'Книга удалена' });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;