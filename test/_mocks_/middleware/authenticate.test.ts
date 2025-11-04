import request from 'supertest';
import app from '../../../src/app';

describe('Authentication middleware (real Firebase)', () => {
  it('returns 401 when Authorization header missing', async () => {
    const res = await request(app).get('/api/v1/loans');
    expect(res.status).toBe(401);
  });

  it('passes with valid token', async () => {
    // Replace <VALID_ID_TOKEN> with a real Firebase ID token from Postman
    const validToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NTEzMjA5OWFkNmJmNjEzODJiNmI0Y2RlOWEyZGZlZDhjYjMwZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9hbi1hcHBsaWNhdGlvbi1mMjg1OSIsImF1ZCI6ImxvYW4tYXBwbGljYXRpb24tZjI4NTkiLCJhdXRoX3RpbWUiOjE3NjIyMDg0MzEsInVzZXJfaWQiOiIxVVpmVmE3UWFiTUE1MHhzQTVPdlNMWmlkejYyIiwic3ViIjoiMVVaZlZhN1FhYk1BNTB4c0E1T3ZTTFppZHo2MiIsImlhdCI6MTc2MjIwODQzMSwiZXhwIjoxNzYyMjEyMDMxLCJlbWFpbCI6InJraGFuMkBycmMuY2EiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicmtoYW4yQHJyYy5jYSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.bJugQ98r_kOiIg9BPIrM0Q56PgBROgQXd_dm2ivNWk24veeaGoU9GSq_16sZTMOZaXb-5w6K5XjWRwK8etlYHJiFqU-iX_g6fGNi-xiHtOD9IEGFNEXl92HbehtMOS0FiaMkqfgQ07ZsbjF63OYuYFJxwR-XAtCe-dej9KMpS4GG7Ll3yXclPILOx13vW2GTpKnLcgK9Bus5gEvQi39ZLQ-3GY7matDwiMmGDbWXoh7uM184pXhdFm16xGDRtjB-2Uwv9GMbdTQlzGqY_91x9be9SsnJic6vVg8OHXvzMT4q3w1LaKel5PVbx4MDtS83PogrSZZ1LvC1kwc2s9pBsQ";
    if (!validToken) {
      throw new Error('Missing TEST_FIREBASE_ID_TOKEN env variable');
    }

    const res = await request(app)
      .get('/api/v1/loans')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.status).toBe(200);
  });
});
