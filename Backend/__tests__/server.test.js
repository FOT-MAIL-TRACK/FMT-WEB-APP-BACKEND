const request = require('supertest');
const app = require('../src/server');

describe('GET /api/example', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/example');
    expect(res.statusCode).toEqual(200);
  });
});

