import admin from '../src/config/firebase';

async function main() {
  const users = [
    { email: 'admin@you.edu', password: 'Pass123!', displayName: 'Admin' },
    { email: 'officer@you.edu', password: 'Pass123!', displayName: 'Officer' },
    { email: 'viewer@you.edu', password: 'Pass123!', displayName: 'Viewer' }
  ];

  for (const u of users) {
    try {
      const rec = await admin.auth().createUser({ email: u.email, password: u.password, displayName: u.displayName });
      console.log('Created:', rec.uid, u.email);
    } catch (err: any) {
      console.warn('Could not create', u.email, err.message);
    }
  }
  process.exit(0);
}

main().catch(console.error);
