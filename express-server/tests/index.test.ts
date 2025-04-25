import request from 'supertest';
import app from '../src/app';

describe('API Tests', () => {
  it('should respond with a 200 status for the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  // Add more tests for other routes and functionalities as needed
});