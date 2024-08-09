import { join } from 'path';
import { readFileSync } from 'fs';
import * as firebaseAdmin from 'firebase-admin';
import { envs } from '@global/configs/envs';

// Directorio de credenciales de firebase
const dirConfigCredentialsFirebase = join(process.cwd(), 'src/global/configs/credentials/firebase');

let filePath = '';
if (envs.environment === 'personal') 
  filePath = join(dirConfigCredentialsFirebase, '/firebase-admin-personal.json');
else if (envs.environment === 'development') 
  filePath = join(dirConfigCredentialsFirebase, '/firebase-admin-dev.json');
else if (envs.environment === 'testing') 
  filePath = join(dirConfigCredentialsFirebase, '/firebase-admin-test.json');
else if (envs.environment === 'production') 
  filePath = join(dirConfigCredentialsFirebase, '/firebase-admin-prod.json');
else
  throw new Error(`Environment inválido: ${envs.environment}`);

const firebaseAdminCredentials = readFileSync(filePath, 'utf-8');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(firebaseAdminCredentials))
});

if (envs.environment === 'personal') 
  console.info('Firebase connected!');

export default firebaseAdmin;