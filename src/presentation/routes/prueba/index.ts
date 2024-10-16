import { Router } from 'express';
import { mwVerificarPS } from '@presentation/_middlewares';

const router = Router();

router.get('/te-amo',
  mwVerificarPS(),
  (req, res, next) => {
    res.send('Feliz previa de cumple amor! <3\nLo estamos logrando!');
  }
)

export default router;