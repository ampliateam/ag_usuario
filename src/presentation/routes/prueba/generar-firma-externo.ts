import { Router } from 'express';
import * as crypto from 'crypto';
import { mwVerificarPS } from '@presentation/_middlewares';
import { envs } from '@global/configs/envs';

const router = Router();

router.get('/',
  mwVerificarPS(),
  (req, res, next) => {
    res.status(200).send('Feliz previa de cumple amor! <3\nLo estamos logrando!');
  }
)

if (envs.environment === 'personal') {
  router.post('/',
    mwVerificarPS({}),
    (req, res, next) => {
      try {
        const timestamp = Date.now();
        const dataToSign = `${req.body.uid}${req.body.clavePublica}${req.body.timestamp || timestamp}`;
        const signature = crypto
          .createHmac('sha256', req.body.clavePrivada)
          .update(dataToSign)
          .digest('hex');
  
        res.status(200).json({
          publicKey: req.body.clavePublica,
          timestamp: req.body.timestamp || timestamp,
          signature
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

export default router;