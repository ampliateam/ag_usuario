import { mwVerificarPS } from '@presentation/middlewares';
import { Router } from 'express';

const router = Router();

router.get('/',
  (req, res, next) => {
    try {
      res.send('Prueba');
    } catch (error) {
      next(error);
    }
  }
);

router.get('/persona',
  mwVerificarPS({ tps: ['persona'] }),
  (req, res, next) => {
    try {
      res.json(req.personalizado.presentationSolicitante)
    } catch (error) {
      next(error);
    }
  }
);

export default router;