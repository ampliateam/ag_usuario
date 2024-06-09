import { Router } from "express";

import { verificarSolicitante } from "@presentation/_middlewares";

// Middleware/Controller
import { mwRoot } from "../middlewares";
import { ctrlRoot } from "../controllers";

const personaRoute = Router();

// Crear usuario
personaRoute.post('/',
    verificarSolicitante({ tsp: ['desconocido'] }),
    mwRoot.crearUsuarioMiddleware,
    ctrlRoot.crearUsuario
);

// Obtener
personaRoute.get('/:tipo/:valor', 
    verificarSolicitante({ tsp: ['desconocido', 'persona', 'externo'] }),
    ctrlRoot.obtenerUsuario
);

// Olvide mi contrasena (anonimo) - SOLICITUD
personaRoute.post('/olvide-mi-contrasena/solicitud', 
    verificarSolicitante({ tsp: ['desconocido'] }),
    mwRoot.omcSolicitud,
    ctrlRoot.omcSolicitud
);

// Olvide mi contrasena (anonimo) - ACTUALIZAR
personaRoute.post('/olvide-mi-contrasena/actualizar', 
    verificarSolicitante({ tsp: ['desconocido'] }),
    mwRoot.omcActualizar,
    ctrlRoot.omcActualizar
);

export { personaRoute };
