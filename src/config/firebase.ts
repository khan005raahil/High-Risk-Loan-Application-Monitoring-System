import admin from 'firebase-admin';
import path from 'path';

const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH || path.resolve('src/config/serviceAccountKey.json');

const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
