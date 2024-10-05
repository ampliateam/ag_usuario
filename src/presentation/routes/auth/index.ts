import { generarRespuestaServidor } from '@presentation/_helpers';
import { mwVerificarPS } from '@presentation/middlewares';
import { Router } from 'express';

const router = Router();

router.post('/verificar-persona',
  mwVerificarPS({ tps: ['persona'] }),
  (req, res, next) => {
    try {
      const respuestaServidor = generarRespuestaServidor({
        exito: true,
        mensaje: 'Persona verificada con exito.',
        resultado: req.personalizado.presentationSolicitante,
      });

      res.json(respuestaServidor);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/verificar-externo',
  mwVerificarPS({ tps: ['externo'] }),
  (req, res, next) => {
    try {
      res.json(req.personalizado.presentationSolicitante)
    } catch (error) {
      next(error);
    }
  }
);

export default router;