import { Router } from 'express';
import { mwVerificarPS } from '@presentation/_middlewares';
import * as usuario from '@presentation/endpoints/usuario';

const router = Router();

// Crear usuario
router.post('/', [
  mwVerificarPS({ tps: ['desconocido'] }),
  ...usuario.crearUsuario.list
]);

// Obtener usuario
router.get('/',[
  mwVerificarPS(),
  ...usuario.obtenerUsuario.list
]);

export default router;