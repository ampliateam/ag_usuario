import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.send('Funcion 1');
  } catch (error) {
    next(error);
  }
});

export default router;