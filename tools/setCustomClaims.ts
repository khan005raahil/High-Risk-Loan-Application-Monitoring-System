import admin from '../src/config/firebase';

async function main() {
  const list = [
    { email: 'admin@you.edu', role: 'admin' },
    { email: 'officer@you.edu', role: 'officer' },
    { email: 'viewer@you.edu', role: 'viewer' }
  ];
  for (const item of list) {
    try {
      const user = await admin.auth().getUserByEmail(item.email);
      await admin.auth().setCustomUserClaims(user.uid, { role: item.role });
      console.log(`Set ${item.role} for ${item.email}`);
    } catch (err:any) {
      console.error('Error setting claim for', item.email, err.message);
    }
  }
  process.exit(0);
}
main().catch(console.error);
