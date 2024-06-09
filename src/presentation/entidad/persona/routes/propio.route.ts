import { Router } from 'express';

import { verificarSolicitante } from '@presentation/_middlewares';

// Middleware/Controller
import { mwPropio } from "../middlewares";
import { ctrlPropio } from "../controllers";

const personaPropioRoute = Router();

personaPropioRoute.patch('/', 
    verificarSolicitante({ tsp: ['persona'] }), 
    mwPropio.verificarActualizacionUsuario,
    ctrlPropio.actualizarUsuario
);

personaPropioRoute.delete('/',
    verificarSolicitante({ tsp: ['persona'] }), 
    mwPropio.verificarEliminacionUsuario,
    ctrlPropio.eliminarUsuario
);

export { personaPropioRoute };
