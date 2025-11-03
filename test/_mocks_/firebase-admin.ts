const mockAuth = {
  verifyIdToken: jest.fn(async (token: string) => {
    if (token === 'valid-token') return { uid: 'user1', role: 'admin' };
    throw new Error('Invalid token');
  }),
  setCustomUserClaims: jest.fn(async () => Promise.resolve()),
  getUser: jest.fn(async (uid: string) => ({ uid, email: 'test@example.com' }))
};

export default {
  auth: () => mockAuth
};
