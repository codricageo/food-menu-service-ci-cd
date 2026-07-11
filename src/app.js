const express = require('express');
const menuRouter = require('./routes');

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/menu', menuRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
