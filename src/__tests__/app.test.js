const request = require('supertest');
const app = require('../app');

describe('Health Check', () => {
  it('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('timestamp');
  });
});

describe('Menu Routes', () => {
  it('GET /menu should return all menu items', async () => {
    const res = await request(app).get('/menu');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.length).toBeGreaterThan(0);
  });

  it('GET /menu/available should return only available items', async () => {
    const res = await request(app).get('/menu/available');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('items');
    res.body.items.forEach((item) => {
      expect(item.available).toBe(true);
    });
  });

  it('GET /menu/categories should return a list of categories', async () => {
    const res = await request(app).get('/menu/categories');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('categories');
    expect(Array.isArray(res.body.categories)).toBe(true);
    expect(res.body.categories.length).toBeGreaterThan(0);
  });

  it('GET /menu/:id should return an existing item', async () => {
    const res = await request(app).get('/menu/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('price');
  });

  it('GET /menu/:id should return 404 for non-existent item', async () => {
    const res = await request(app).get('/menu/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Unknown Routes', () => {
  it('should return 404 for unknown paths', async () => {
    const res = await request(app).get('/unknown-path');
    expect(res.statusCode).toBe(404);
  });
});
