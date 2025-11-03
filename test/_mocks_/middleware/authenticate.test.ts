import request from 'supertest';
import app from '../src/app';
jest.mock('firebase-admin', () => require('./__mocks__/firebase-admin').default);

describe('Authentication middleware', () => {
  it('returns 401 when Authorization header missing', async () => {
    const res = await request(app).get('/api/v1/loans');
    expect(res.status).toBe(401);
  });

  it('passes with valid token', async () => {
    const res = await request(app).get('/api/v1/loans').set('Authorization', 'Bearer valid-token');
    expect(res.status).toBe(200);
  });
});
