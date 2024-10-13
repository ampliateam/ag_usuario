import { Router } from 'express';
import * as auth from '@presentation/endpoints/auth';
import { mwVerificarPS } from '@presentation/_middlewares';

const router = Router();

// Verifica las credenciales-persona de un usuario
router.post('/verificar-persona', [
  mwVerificarPS({ tps: ['persona'] }),
  ...auth.verificarPersona.list
]);

// Verifica las credenciales-externo de un usuario
router.post('/verificar-externo',
  mwVerificarPS({ tps: ['externo'] }),
  ...auth.verificarExterno.list
);

export default router;