import * as firebaseAdmin from 'firebase-admin';
import { envs } from '@global/configs/envs';

const stringFirebaseCredentials = envs.firebaseCredentials.replace(/\n/g, '\\n');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(stringFirebaseCredentials))
});

if (envs.environment === 'personal') 
  console.info('Firebase connected!');

export default firebaseAdmin;