const request = require('supertest');
const app = require('../src/server'); // Adjust this path to your server.js file

describe('API Routes', () => {

  // Test for /api/letters route
  describe('GET /api/letters', () => {
    it('should return a list of letters and 200 OK', async () => {
      const res = await request(app).get('/api/letters');
      expect(res.statusCode).toEqual(200); // Expecting a successful response
      expect(res.body).toBeInstanceOf(Array); // Assuming it returns an array of letters
    });
  });

  // Test for /api/users route
  describe('GET /api/users', () => {
    it('should return a list of users and 200 OK', async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toEqual(200); // Expecting a successful response
      expect(res.body).toBeInstanceOf(Array); // Assuming it returns an array of users
    });
  });

});
