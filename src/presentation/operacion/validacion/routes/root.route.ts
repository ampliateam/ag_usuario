import { Router } from "express";
import { verificarSolicitante } from "@presentation/_middlewares";
import { ctrlValidacion } from "../controllers";

const validacionRoute = Router();

// De momento solo se le trata como funcionalidad para 'desconocido'
validacionRoute.post('/verificar-solicitante', 
    verificarSolicitante({ tsp: ['desconocido', 'externo']} ),
    ctrlValidacion.verificarSolicitante
);

export { validacionRoute };
