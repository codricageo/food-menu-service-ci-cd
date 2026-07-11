const express = require('express');
const menuItems = require('./menuData');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ items: menuItems });
});

router.get('/available', (_req, res) => {
  res.json({ items: menuItems.filter((item) => item.available) });
});

router.get('/categories', (_req, res) => {
  const categories = [...new Set(menuItems.map((item) => item.category))];
  res.json({ categories });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = menuItems.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Menu item not found' });
  }
  res.json(item);
});

module.exports = router;
