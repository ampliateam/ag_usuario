import * as firebaseAdmin from 'firebase-admin';
import { envs } from '@global/configs/envs';

const stringFirebaseCredentials = envs.firebaseCredentials.replace(/\n/g, '\\n');
const firebaseCredentials = JSON.parse(stringFirebaseCredentials);
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseCredentials)
});

if (envs.environment === 'personal') 
  console.info('Firebase connected!');

export default firebaseAdmin;